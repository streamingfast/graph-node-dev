## The Graph Node - Development Repository

The aim of this repository is to contain some scripts and various configurations files
to effectively develop `graph-node` project with appropriate datas.

Mainly it consists of:

- Development dependencies via Docker
- Series of useful subgraph definitions for proper development
- Helper scripts to enhance developer experience

### Quick Start

If it's the first time you clone the repository, ensure that Docker is running and install
the required Node.js dependencies:

```bash
yarn install
```

Then we will open different terminals to perform certain actions, most of them are long living
tasks.

```bash
# In first terminal
./up.sh # Flag -c can be added to clean the persistent folders prior running Postgres, IPFS and any similar required services
```

```bash
# In another terminal
kc -n eth-ropsten port-forward svc/peering-v3 8545
```

**Note** Required only if developing Firehose services, which is the case here.

```bash
# Again in another terminal
cd ~/work/graph-node # Changed accordingly to where your `graph-node` project is
GRAPH_LOG=trace cargo run -- --config devel/config-dev-firehose.toml --ipfs "localhost:5001"
```

```bash
# Yet again in another terminal
./deploy.sh transfer # Flag -c can be added to remove the previous deployment if it exists
```

### Content of `devel/config-dev-firehose.toml`

The file assumed the dependencies are the one provided by `docker compose up` (fired through `up.sh` invocation).

```
[general]
query_only = ".*"

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
  { label = "firehose", url = "https://ropsten.streamingfast.io", details = { type = "Firehose" }, features = [] },
  { label = "peering", url = "http://localhost:8545", features = [] },
]

[deployment]
[[deployment.rule]]
shard = "primary"
indexers = [ "default" ]
```
