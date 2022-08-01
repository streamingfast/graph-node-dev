
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Extracts chain of subgraph from manifest filename turning input `subgraphs/near/blocks/subgraph.yaml`
# into return value `near`
chain() {
  printf $1 | sed -E 's,(\./)?subgraphs/,,' | sed -E 's,/[_a-zA-Z0-9-]+/[_a-zA-Z0-9-]+\.yaml$,,'
}

# Extracts name of subgraph from manifest filename turning input `subgraphs/near/blocks/subgraph.yaml`
# into return value `blocks`
name() {
  printf $1 | sed -E 's,(\./)?subgraphs/,,' | sed -E 's,/[_a-zA-Z0-9-]+\.yaml$,,' | sed -E 's,^[_a-zA-Z0-9-]+/,,'
}

# Extracts the expected `networks.json` file from manifest filename turning input `subgraphs/near/blocks/subgraph.yaml`
# into return value `subgraphs/near/blocks/networks.yaml`
networksFileFor() {
  printf $1 | sed -E 's,[_a-zA-Z0-9-]+\.yaml$,networks.json,'
}

deployment_name() {
  name="`name $1`"
  suffix="$2"

  deployment_name="sf/$name"
  if [[ -n "$suffix" ]]; then
    deployment_name="$deployment_name-$suffix"
  fi

  printf "$deployment_name"
}

subgraphs() {
   find subgraphs -type f -name "*.yaml" | tr "\n" " " | sed -E s'/, $//' | sed -E s,^[_a-zA-Z0-9-]+/,,
}

execution_error() {
  message="$1"
  exit_code="$2"

  echo "ERROR: $message"
  echo ""
  exit ${exit_code:-1}
}

usage_error() {
  message="$1"
  exit_code="$2"

  echo "ERROR: $message"
  echo ""
  usage
  exit ${exit_code:-1}
}

graphman_remove() {
  check_graphman

  $GRAPHMAN --config "$ROOT/config/graphman.toml" remove "$1"
  $GRAPHMAN --config "$ROOT/config/graphman.toml" unused record
  $GRAPHMAN --config "$ROOT/config/graphman.toml" unused remove
}

check_graphman() {
  if [[ ! -f "$GRAPHMAN" ]]; then
    echo "Cleaning previous deployment requires that \$GRAPHMAN environment variable points to 'graphman' CLI tool (current value is '$GRAPHMAN')"
    exit 1
  fi
}