#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$ROOT/library.sh"

graph="node_modules/.bin/graph"
build=
clean=
suffix=
using_path=true
subgraphName=
subgraphHash=

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "hbcs" opt; do
    case $opt in
      h) usage && exit 0;;
      b) build=true;;
      c) clean=true;;
      s) suffix=$OPTARG;;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  path="$1"; shift
  if [[ "$path" =~ [^@]+@Qm.+ ]]; then
    using_path=""
    using_name="true"
    subgraphName=`printf "$path" | sed -E "s/@Qm.+$//"`
    subgraphHash=`printf "$path" | sed -E "s/^[^@]+@//"`
  else
    if [[ ! -f "./$path" ]]; then
      usage_error "Invalid subgraph name, valid names are: `subgraphs`"
    fi

    subgraphName="`deployment_name $path $suffix`"
  fi

  network="$1"

  if [[ "$using_path" == "true" ]]; then
    rm -rf build

    if [[ $build == true ]]; then
      ./build.sh "$path"
    fi
  fi

  if [[ $clean == true ]]; then
    graphman_drop "$subgraphName"
  fi

  if [[ "$using_path" == "true" ]]; then
    deploy_from_manifest "$path"
  else
    deploy_from_hash "$subgraphHash" "$subgraphName"
  fi
}

deploy_from_manifest() {
  path="$1"

  chain=`chain $path`
  deployment="`deployment_name $path $suffix`"
  node="http://127.0.0.1:8020"

  $graph create "$deployment" --node "$node"
  $graph deploy --node $node --ipfs http://127.0.0.1:5001 --version-label v0.0.1 "$deployment" "$path"
}

deploy_from_hash() {
  hash="$1"
  name="$2"
  jsonRpcCurl="curl -H 'Content-Type: application/json'"

  node="http://127.0.0.1:8020"

  $graph create "$name" --node "$node"
  curl -H 'Content-Type: application/json' -d "{\"id\":\"2.0\",\"method\":\"subgraph_deploy\",\"params\":{\"name\":\"$name\", \"ipfs_hash\": \"$hash\", \"version_label\": \"v0.0.1\", \"debug_fork\": \"\" }}" "$node"
}

usage() {
  echo "usage: deploy [-b] [-c] [-s <suffix>] <name> [<network>]"
  echo ""
  echo "Deploy the given named subgraph to the development system."
  echo "This scripts deals with all required commands needed to deploy"
  echo "a subgraph into a development environment."
  echo ""
  echo ""
  echo "If <network> argument is specified, '--network' is passed to graph-cli"
  echo "tool effectively templating the manifest with the correct values for"
  echo "the network."
  echo ""
  echo "Options"
  echo "    -b            Build the subgraph prior deploying it"
  echo "    -c            Clean any previous deployment(s)"
  echo "    -s <suffix>   Add <suffix> at the end of the deployment name, useful to start multiple times the same subgraph"
  echo "    -h            Display help about this script"
}

main "$@"
