## The Graph Node - Development Repository

The aim of this repository is to contain some scripts and various configurations files
to effectively develop a `graph-node` project with appropriate data.

Mainly it consists of:

- Development dependencies via Docker
- Series of useful subgraph definitions for proper development
- Helper scripts to enhance developer experience

### Quick Start

If this is the first time you clone the repository, ensure that Docker is running and install
the required Node.js dependencies:

```bash
yarn install
```

Then we will open different terminals to perform certain actions, most of them are long living
tasks.

#### Setting up Database and IPFS node

In first terminal, start the docker containers for postgres and ipfs by running the following
```bash
./up.sh # Flag -c can be added to clean the persistent folders prior running Postgres, IPFS and any similar required services
```

#### Setting up Firehose
**Note** Required only if developing Firehose services

If you want to test a subgraph which is pulling data from firehose, you will need to connect to the correct `firehose` based on the
network you want to consume `ethereum`, `solana`

In another terminal, set up the port-forward to the peering service for solana
```bash
# 
./pf-sol.sh
```

OR 

In another terminal, set up the port-forward to the peering service for bsc
```bash
./pf-bsc.sh
```

#### Launching Graph Node

If you have not yet cloned graph-node you can do so now
```bash
git clone https://github.com/graphprotocol/graph-node
```
You are now ready run `graph-node`. You will need to run the following command from the `graph-node` folder. 
The `config/graph-node.eth-ropsten.toml` points to the config file in this repo, so you will need to update the paths
accordingly

Note: You may need to setup a few ENV VARS to connect to `firehose` or `substreams`, like this `STREAMING_FAST_API_TOKEN`

```bash
# Again in another terminal
GRAPH_LOG=trace cargo run -- --config config/graph-node.eth-ropsten.toml --ipfs "localhost:5001"
```

#### Deploying Your Subgraph

1) Via the graph cli tool
```bash
# Yet again in another terminal, deploy the subgraph to your local stack
./deploy.sh subgraphs/ethereum/transfer/ropsten-calls.yaml # Flag -c can be added to remove the previous deployment if it exists
```

1) via cli


You will need to push your subgraph manifest file to your local ipfs node
```bash
ipfs add substreams/ethereum/mainnet-network.yaml
```

Deploying your subgraph

```bash
# Yet again in another terminal, deploy the subgraph to your local stack, note the IPFS hash should point to your subgraph manifest. 
export i=QmUFVjzLeSRAjUNnNcdC4LEM3kncZwand2fj7gbNBjVV4A
# you can install http via brew install httpie
http -I post http://localhost:8020/ jsonrpc="2.0" id="1" method="subgraph_create" params:="{\"name\": \""$i"\"}" && http -I post http://localhost:8020/ jsonrpc="2.0" id="1" method="subgraph_deploy" params:="{\"name\": \""$i"\", \"ipfs_hash\": \""$i"\", \"version_label\": \"1\"}"

```

### Content of `config-firehose.toml`

The file assumed the dependencies are the one provided by `docker-compose up` (fired through `up.sh` invocation).

```
[[general]

[store]
[store.primary]
connection = "postgresql://graph-node:let-me-in@localhost:5432/graph-node"
weight = 1
pool_size = 10

[chains]
ingestor = "block_ingestor_node"
[chains.ropsten]
shard = "primary"
provider = [
  { label = "firehose", details = { type = "firehose", url = "https://ropsten.streamingfast.io", token = "<fill_me>" }},
  { label = "peering", url = "http://localhost:8545", features = [] },
]

[deployment]
[[deployment.rule]]
shard = "primary"
indexers = [ "default" ]
```
