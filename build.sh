#!/usr/bin/env bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$ROOT/library.sh"

graph="node_modules/.bin/graph"

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "hc" opt; do
    case $opt in
      h) usage && exit 0;;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  rm -rf build

  path="$1"; shift
  if [[ ! -f "./$path" ]]; then
    usage_error "Invalid subgraph name, valid names are: `subgraphs`"
  fi

  set -e
  build "$path"
}

build() {
  path="$1"

  chain=`chain $path`
  name=`name $path`

  $graph codegen -o "subgraphs/$chain/$name/generated" "$path"
  $graph build "$path"
}

usage() {
  echo "usage: build [-c] <name>"
  echo ""
  echo "Build the given named subgraph to the development system."
  echo "This scripts deals with all required commands needed to generate"
  echo "code and build a subgraph into a development environment."
  echo ""
  echo "Options"
  echo "    -h          Display help about this script"
}

main "$@"