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

  network="$1"

  set -e
  build "$path" "$network"
}

build() {
  path="$1"
  network="$2"

  chain=`chain $path`
  name=`name $path`

  $graph codegen -o "subgraphs/$chain/$name/generated" "$path"

  args=
  if [[ "$network" != "" ]]; then
    networkFile=`networksFileFor "$path"`
    if [[ ! -f "$networkFile" ]]; then
      execution_error "You provided network '$network' argument but file '$networkFile' was not found, create it with correct parameters"
    fi

    args="--network=$network --networkFile=$networkFile"
  fi

  $graph build "$path" --ipfs http://localhost:5001 $args
}

usage() {
  echo "usage: build [-c] <name> [<network>]"
  echo ""
  echo "Build the given named subgraph to the development system."
  echo "This scripts deals with all required commands needed to generate"
  echo "code and build a subgraph into a development environment."
  echo ""
  echo "If <network> argument is specified, '--network' is passed to graph-cli"
  echo "tool effectively templating the manifest with the correct values for"
  echo "the network."
  echo ""
  echo "Options"
  echo "    -h          Display help about this script"
}

main "$@"
