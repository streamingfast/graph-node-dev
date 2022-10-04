## Running Substreams in graph-node

### Setup

#### Checkout the necessary repos
```bash
git clone https://github.com/graphprotocol/graph-node.git
git clone https://github.com/streamingfast/graph-node-dev.git
```

#### Register and get a `StreamingFast` Api key
Check out the documentation page [here](https://substreams.streamingfast.io/reference-and-specs/authentication).

### Automate generating the `StreamingFast` token
```bash
export STREAMINGFAST_KEY=[YOUR_API_KEY_GOES_HERE]
function sftoken {
  export FIREHOSE_API_TOKEN=$(curl https://auth.streamingfast.io/v1/auth/issue -s --data-binary '{"api_key":"'$STREAMINGFAST_KEY'"}' | jq -r .token)
  export SUBSTREAMS_API_TOKEN=$FIREHOSE_API_TOKEN
  echo Token set on FIREHOSE_API_TOKEN and SUBSTREAMS_API_TOKEN
}
```

### Running necessary infrastructure
You have two different ways to run the infrastructure. 

#### Method #1 - IPFS and Postgres
In a separate terminal
```bash
cd graph-node-dev
./up.sh -c # -c will clean the ./data folder created a the root of graph-node-dev to run with a clean ipfs and postgres
```

#### Method #2 - IPFS
In a separate terminal
```bash
cd graph-node-dev
docker-compose up ipfs
```

#### Method #2 - Postgres
In a separate terminal
```bash
cd graph-node/docker
docker-compose up postgres
```

### Write config for using `Substreams` API
Update `graph-node-dev/config/eth-mainnet-substreams.toml`

```bash
[general]

[store]
[store.primary]
connection = "postgresql://graph-node:let-me-in@localhost:5432/graph-node"
weight = 1
pool_size = 10

[chains]
ingestor = "block_ingestor_node"
[chains.mainnet]
shard = "primary"
provider = [
	{ label = "peering", url = "$RPC_ENDPOINT", features = [ "archive" ] },
    { label = "substreams-provider-mainnet", details = { type = "substreams", url = "https://api.streamingfast.io", token = "$STREAMING_FAST_API_TOKEN" }},
]


[deployment]
[[deployment.rule]]
shard = "primary"
indexers = [ "default" ]
```

> If you have a local instance of firehose running

### Run `graph-node`
```bash
cd graph-node
GRAPH_LOG=debug cargo run -- --config  ../../streamingFast/graph-node-dev/config/eth-mainnet-substreams-localhost.toml --ipfs "localhost:5001"
```

### Build `substreams` package
```bash
cd graph-node-dev/subgraphs/substreams/uniswap
./build.sh
../../../resolve_uniswap.sh mainnet-network.yaml schema.graphql

# Cleaning up (mainnet-network_resolved.yaml)
# Packing Substreams
# Substreams spkg is ready uniswap-v3-v0.1.0-beta.spkg
# 
# Adding schema schema.graphql to IPFS
# GraphQL schema cid QmSnfA3cnuopu97PGGheGAyrHvoxdMnWZVcms4mq6ANbz1
# 
# Adding spkg uniswap-v3-v0.1.0-beta.spkg to IPFS
# SPKG cid QmVzk9KmSLJb8q4uyxRoz9uajYQL5La5Wx2hSKWZYVP7Di
# 
# Output resolved subgraph manifest: mainnet-network_resolved.yaml
# Resolved manifest has been uploaded to ipfs QmVeNhXpHK5ax6UooZZYH73RRd38pPciPU5kmjgdmfLjJp
# Run the following command to upload to your graph-node:

curl -H "Content-Type: application/json" -d "{\"jsonrpc\":\"2.0\", \"id\":\"2.0\",\"method\":\"subgraph_create\",\"params\":{\"name\":\"QmVeNhXpHK5ax6UooZZYH73RRd38pPciPU5kmjgdmfLjJp\"}}" http://127.0.0.1:8020
curl -H "Content-Type: application/json" -d "{\"jsonrpc\":\"2.0\", \"id\":\"2.0\",\"method\":\"subgraph_deploy\",\"params\":{\"name\":\"QmVeNhXpHK5ax6UooZZYH73RRd38pPciPU5kmjgdmfLjJp\",\"ipfs_hash\":\"QmVeNhXpHK5ax6UooZZYH73RRd38pPciPU5kmjgdmfLjJp\",\"version_label\": \"1\"}}" http://127.0.0.1:8020
```

> The above *Build `substreams` package section*  is for uniswap-v3-beta spkg with the already provided spkg in the project
