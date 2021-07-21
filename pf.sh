#!/usr/bin/env bash

main() {
    kubectl port-forward -n eth-ropsten svc/peering-v3 8545:8545
}

main 