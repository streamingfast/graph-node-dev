#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

clean=

main() {
  while getopts "hc" opt; do
    case $opt in
      h) usage && exit 0;;
      c) clean=true;;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  manifest_file="$1"
  manifest_resolved_file=`printf "$manifest_file" | sed -e "s/.yaml/_resolved.yaml/"`
  schema_file="$2"
  substreams_file="`dirname "$manifest_file"`/substreams.yaml"

  echo "Cleaning up ($manifest_resolved_file)"
  rm -f manifest_resolved_file

  manifest_dir=`pwd`
  echo "Packing Substreams"
  spkg_file=`pack "$substreams_file"`
  echo "Substreams spkg is ready $spkg_file"
  echo ""

  set +e

  echo "Adding schema $schema_file to IPFS"
  schema_cid=`ipfs_upload "$manifest_dir/$schema_file"`
    if [[ $? != 0 ]]; then
    echo "Failed to upload to IPFS"
    cat "$spkg_cid"
    exit 1
  fi

  echo "GraphQL schema cid $schema_cid"
  echo ""

  echo "Adding spkg $spkg_file to IPFS"
  spkg_cid=`ipfs_upload "$manifest_dir/$spkg_file"`
  if [[ $? != 0 ]]; then
    echo "Failed to upload to IPFS"
    cat "$spkg_cid"
    exit 1
  fi

  set -e

  echo "SPKG cid $spkg_cid"
  echo ""

  echo "Output resolved subgraph manifest: $manifest_resolved_file"
  cat "$manifest_dir/$manifest_file" | sed -e "s:<schema_cid>:/ipfs/$schema_cid:" | sed -e "s:<spkg_cid>:/ipfs/${spkg_cid}:" > "$manifest_dir/$manifest_resolved_file"

  resolved_manifest_file_cid=`ipfs_upload "$manifest_dir/$manifest_resolved_file"`
  echo "Resolved manifest has been uploaded to ipfs $resolved_manifest_file_cid"
  echo "Run the following command to upload to your graph-node:"
  echo ""

  echo "i=\"$resolved_manifest_file_cid\""
  echo "http -I post http://localhost:8020/ jsonrpc=\"2.0\" id=\"1\" method=\"subgraph_create\" params:=\"{\"name\": \""\$i"\"}"

  echo curl -H 'Content-Type: application/json' -d '{"id":"2.0","method":"subgraph_create","params":{"name":"'$resolved_manifest_file_cid'"}}' http://127.0.0.1:8020
  echo curl -H 'Content-Type: application/json' -d '{"id":"2.0","method":"subgraph_deploy","params":{"name":"substreams","ipfs_hash":"'$resolved_manifest_file_cid'","version_label": "1"}}' http://127.0.0.1:8020
}

ipfs_upload() {
  filename="$1"
  response=`ipfs add "$filename" --api "/ip4/127.0.0.1/tcp/5001" 2>/tmp/ipfs.log`
  if [[ $? != 0 ]]; then
    echo '/tmp/ipfs.log'
    exit 1
  fi

  echo `printf "$response" | grep -Eo "Qm[^ ]+"`
}

pack() {
  substreams_file="$1"
  substreams_dir=`dirname "$substreams_file"`

  # There is a bug in `substreams` CLI not resolving `wasm` file relative to `substreams.yaml`,
  cd "$substreams_dir"

  pack=`substreams pack substreams.yaml | grep -Eo "[^ ]+.spkg" | head -1`
  if [[ $? != 0 ]]; then
    echo "Failed to substreams pack $substreams_file"
    echo $response
    exit 1
  fi

  echo "$substreams_dir/$pack"
}

usage_error() {
  message="$1"
  exit_code="$2"

  echo "ERROR: $message"
  echo ""
  usage
  exit ${exit_code:-1}
}

usage() {
  echo "usage: up [-c]"
  echo ""
  echo "Setup required files layout and launch 'docker compose up'"
  echo "spinning up all required development dependencies."
  echo ""
  echo "Options"
  echo "    -c          Clean 'data' directory before launching dependencies"
  echo "    -h          Display help about this script"
}

main "$@"


