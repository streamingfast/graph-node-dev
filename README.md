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

```bash
# In first terminal, start the docker containers for postgres and ipfs by running the following
./up.sh # Flag -c can be added to clean the persistent folders prior running Postgres, IPFS and any similar required services
```

```bash
# In another terminal, set up the port-forward to the peering service for solana
./pf-sol.sh
```

```bash
# In another terminal, set up the port-forward to the peering service for bsc
./pf-bsc.sh
```

**Note** Required only if developing Firehose services, which is the case here.

```bash
# Again in another terminal
cd ~/work/graph-node # Changed accordingly to where your `graph-node` project is
GRAPH_LOG=trace cargo run -- --config config/graph-node.eth-ropsten.toml --ipfs "localhost:5001"
```

```bash
# Yet again in another terminal, deploy the subgraph to your local stack
./deploy.sh subgraphs/ethereum/transfer/ropsten-calls.yaml # Flag -c can be added to remove the previous deployment if it exists
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
