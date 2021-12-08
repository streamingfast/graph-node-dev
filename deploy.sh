#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$ROOT/library.sh"

graph="node_modules/.bin/graph"
build=
clean=
upload_only=

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "hbcu" opt; do
    case $opt in
      h) usage && exit 0;;
      b) build=true;;
      c) clean=true;;
      u) upload_only=true;;
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
    graphman_remove "$path"
  fi

  deploy "$path"
}

deploy() {
  path="$1"

  chain=`chain $path`
  name=`name $path`
  node="http://127.0.0.1:8020"
  if [[ "$upload_only" != true ]]; then
    # Unresolvable node prevent deployment for now, until `graph-cli` offers it natively
    node="http://unknown:1"
  fi

  if [[ "$upload_only" != true ]]; then
    $graph create "sf/$name" --node "$node"
  fi

  $graph deploy --node $node --ipfs http://127.0.0.1:5001 --version-label v0.0.1 "sf/$name" "$path"
}

usage() {
  echo "usage: deploy [-c] <name>"
  echo ""
  echo "Deploy the given named subgraph to the development system."
  echo "This scripts deals with all required commands needed to deploy"
  echo "a subgraph into a development environment."
  echo ""
  echo "Options"
  echo "    -b          Build the subgraph prior deploying it"
  echo "    -c          Clean any previous deployment(s)"
  echo "    -u          Upload only IPFS files and do not actually deploy"
  echo "    -h          Display help about this script"
}

main "$@"