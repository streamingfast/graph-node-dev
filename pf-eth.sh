#!/usr/bin/env bash

main() {
    kubectl port-forward -n eth-mainnet svc/firehose-unstable 9000:9000
}

main