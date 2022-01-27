#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$ROOT/library.sh"

graph="node_modules/.bin/graph"
build=
clean=
suffix=

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "hbcs:" opt; do
    case $opt in
      h) usage && exit 0;;
      b) build=true;;
      c) clean=true;;
      s) suffix=$OPTARG;;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  rm -rf build

  path="$1"; shift
  if [[ ! -f "./$path" ]]; then
    usage_error "Invalid subgraph name, valid names are: `subgraphs`"
  fi

  if [[ $build == true ]]; then
    ./build.sh "$path"
  fi

  if [[ $clean == true ]]; then
    graphman_remove "`deployment_name $path $suffix`"
  fi

  deploy "$path"
}

deploy() {
  path="$1"

  chain=`chain $path`
  deployment="`deployment_name $path $suffix`"
  node="http://127.0.0.1:8020"

  $graph create "$deployment" --node "$node"
  $graph deploy --node $node --ipfs http://127.0.0.1:5001 --version-label v0.0.1 "$deployment" "$path"
}

usage() {
  echo "usage: deploy [-b] [-c] [-s <suffix>] <name>"
  echo ""
  echo "Deploy the given named subgraph to the development system."
  echo "This scripts deals with all required commands needed to deploy"
  echo "a subgraph into a development environment."
  echo ""
  echo "Options"
  echo "    -b            Build the subgraph prior deploying it"
  echo "    -c            Clean any previous deployment(s)"
  echo "    -s <suffix>   Add <suffix> at the end of the deployment name, useful to start multiple times the same subgraph"
  echo "    -h            Display help about this script"
}

main "$@"
