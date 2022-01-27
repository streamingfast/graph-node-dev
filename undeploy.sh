#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

name=
suffix=

source "$ROOT/library.sh"

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "hns:" opt; do
    case $opt in
      h) usage && exit 0;;
      n) name=true;;
      s) suffix="$OPTARG";;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  if [[ $# -ne 1 ]]; then
    usage_error "Exactly one argument must be specified"
  fi

  if [[ "$name" == true && "$suffix" != "" ]]; then
    usage_error "Flag -n and -s <suffix> are mutually exclusive, only one of those can be used in one invocation"
  fi

  if [[ "$name" == true ]]; then
      graphman_remove "$1"
  else
      path="$1"; shift
      if [[ ! -f "./$path" ]]; then
        usage_error "Invalid subgraph name, valid names are: `subgraphs`"
      fi

      deployment="`deployment_name $path $suffix`"
      graphman_remove "$deployment"
  fi
}

usage() {
  echo "usage: undeploy [-n] [-s <suffix>] <manifest>"
  echo ""
  echo "Undeploy the given named subgraph to the development system."
  echo "GRAPHMAN environment variable must point to a valid 'graphman' command."
  echo ""
  echo "Options"
  echo "    -h            Display help about this script"
  echo "    -n            Assume the passed arguments are subgraph's name directly instead of a manifest's path, exclusive with -s <suffix>"
  echo "    -s <suffix>   Add <suffix> at the end of the deployment name, useful to start multiple times the same subgraph, exclusive with -n"

}

main "$@"