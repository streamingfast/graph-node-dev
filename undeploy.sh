#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$ROOT/library.sh"

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "h" opt; do
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

  undeploy
}

undeploy() {
  graphman_remove "$path"
}

usage() {
  echo "usage: undeploy <name>"
  echo ""
  echo "Undeploy the given named subgraph to the development system."
  echo "GRAPHMAN environment variable must point to validate graphman command."
  echo ""
  echo "Options"
  echo "    -h          Display help about this script"
}

main "$@"