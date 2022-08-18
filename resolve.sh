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
  manifest_resolved_file=`echo "$manifest_file" | sed -e "s/.yaml/_resolved.yaml/"`

  echo "Cleaning Up"
  rm -f manifest_resolved_file

  schema_file="$2"

  manifest_dir=`pwd`
  echo "Packing Substreams"
  spkg_file=`pack`
  echo "Substreams spkg is ready $spkg_file"
  echo ""

  echo "Adding schema $schema_file to IPFS"
  schema_cid=`ipfs_upload "$manifest_dir/$schema_file"`
  echo "GraphQL schema cid $schema_cid"
  echo ""

  echo "Adding spkg $spkg_file to IPFS"
  spkg_cid=`ipfs_upload "$manifest_dir/$spkg_file"`
  echo "SPKG cid $spkg_cid"
  echo ""

  echo "output resolved subgraph manifest: $manifest_resolved_file"
  cat "$manifest_dir/$manifest_file" | sed -e "s:<schema_cid>:/ipfs/$schema_cid:" | sed -e "s:<spkg_cid>:/ipfs/${spkg_cid}:" > "$manifest_dir/$manifest_resolved_file"

  resolved_manifest_file_cid=`ipfs_upload "$manifest_dir/$manifest_resolved_file"`
  echo "Resolved manifest has been uploaded to ipfs $resolved_manifest_file_cid"
  echo "Run the following command to upload to your graph-node"
  echo ""
  cmd=$(cat <<EOF
i="$resolved_manifest_file_cid"
http -I post http://localhost:8020/ jsonrpc="2.0" id="1" method="subgraph_create" params:="{\"name\": \""$i"\"}" && http -I post http://localhost:8020/ jsonrpc="2.0" id="1" method="subgraph_deploy" params:="{\"name\": \""$i"\", \"ipfs_hash\": \""$i"\", \"version_label\": \"1\"}"
  )
  echo "$cmd"

}

ipfs_upload() {
  filename="$1"
  response=`ipfs add "$filename" --api "/ip4/127.0.0.1/tcp/5001" 2>/dev/null | grep -Eo "Qm[^ ]+"`
  echo "$response"
}

pack() {
  pack=`substreams pack substreams.yaml | grep -Eo "[^ ]+.spkg" | head -1`
  echo "$pack"
}


prepare() {
  if [[ ! -d "./data/ipfs" ]]; then
    mkdir -p ./data/ipfs 1> /dev/null
  fi

  if [[ ! -d "./data/postgres" ]]; then
    mkdir -p ./data/postgres 1> /dev/null
  fi
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


