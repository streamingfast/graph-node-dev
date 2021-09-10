#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$ROOT/library.sh"

graph="node_modules/.bin/graph"
clean=

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "hc" opt; do
    case $opt in
      h) usage && exit 0;;
      c) clean=true;;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  rm -rf build

  path="$1"; shift
  if [[ ! -f "./$path" ]]; then
    usage_error "Invalid subgraph name, valid names are: `subgraphs`"
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

  if [[ "$chain" != "near-mainnet" ]]; then
    $graph codegen -o "subgraphs/$chain/$name/generated" "$path"
  fi

  $graph build "$path"
  $graph create "sf/$name" --node http://127.0.0.1:8020
  $graph deploy --node http://127.0.0.1:8020 --ipfs http://127.0.0.1:5001 "sf/$name" "$path"
}

usage() {
  echo "usage: deploy [-c] <name>"
  echo ""
  echo "Deploy the given named subgraph to the development system."
  echo "This scripts deals with all required commands needed to deploy"
  echo "a subgraph into a development environment."
  echo ""
  echo "Options"
  echo "    -c          Clean any previous deployment(s)"
  echo "    -h          Display help about this script"
}

main "$@"