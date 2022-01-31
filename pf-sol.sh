#!/usr/bin/env bash

main() {
    kubectl port-forward -n sol-mainnet svc/firehose 9000:9000
}

main