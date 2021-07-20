#!/usr/bin/env bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

graph="node_modules/.bin/graph"
graphman="$GRAPHMAN"
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

  name="$1"; shift
  if [[ ! -f "./subgraphs/$name.yaml" ]]; then
    usage_error "Invalid subgraph name, valid names are: `subgraphs`"
  fi

  if [[ $clean == true ]]; then
    if [[ ! -f "$GRAPHMAN" ]]; then
      echo "Cleaning previous deployment requires that \$GRAPHMAN environment variable points to 'graphman' CLI tool (current value is '$GRAPHMAN')"
      exit 1
    fi

    $graphman --config graph-node.config.toml remove "sf/$name"
  fi

  deploy "$name"
}

deploy() {
  name="$1"

  $graph codegen "subgraphs/$name.yaml"
  $graph build "subgraphs/$name.yaml"
  $graph create "sf/$name" --node http://127.0.0.1:8020
  $graph deploy --node http://127.0.0.1:8020 --ipfs http://127.0.0.1:5001 "sf/$name" "subgraphs/$name.yaml"
}

subgraphs() {
  echo subgraphs/*.yaml | sed s,subgraphs/,,g | sed s'/.yaml/,/'g | sed -E s'/,$//'
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