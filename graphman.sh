
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

graphman="$GRAPHMAN"
if [[ "$graphman" == "" ]]; then
  graphman="graphman"
fi

exec $graphman --config "$ROOT/config/graphman.toml" "$@"
