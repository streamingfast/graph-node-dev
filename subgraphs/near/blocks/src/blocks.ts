import { near, BigInt } from "@graphprotocol/graph-ts"
import { BlockEvent } from "../generated/schema"

export function handleBlock(block: near.Block): void {
  const header = block.header
  let event = new BlockEvent(header.hash.toHexString())
  event.number = BigInt.fromU64(header.height)
  event.height = BigInt.fromU64(block.header.height)
  event.prevHeight = BigInt.fromU64(block.header.prevHeight)
  event.blockOrdinal = BigInt.fromU64(block.header.blockOrdinal)
  event.epochId = block.header.epochId
  event.nextEpochId = block.header.nextEpochId
  event.chunksIncluded = BigInt.fromU64(block.header.chunksIncluded)
  event.hash = block.header.hash
  event.prevHash = block.header.prevHash
  event.timestampNanosec = BigInt.fromU64(block.header.timestampNanosec)
  event.prevStateRoot = block.header.prevStateRoot
  event.chunkReceiptsRoot = block.header.chunkReceiptsRoot
  event.chunkHeadersRoot = block.header.chunkHeadersRoot
  event.chunkTxRoot = block.header.chunkTxRoot
  event.outcomeRoot = block.header.outcomeRoot
  event.challengesRoot = block.header.challengesRoot
  event.randomValue = block.header.randomValue
  event.gasPrice = block.header.gasPrice
  event.totalSupply = block.header.totalSupply
  event.lastFinalBlock = block.header.lastFinalBlock
  event.lastDsFinalBlock = block.header.lastDsFinalBlock
  event.nextBpHash = block.header.nextBpHash
  event.blockMerkleRoot = block.header.blockMerkleRoot
  event.epochSyncDataHash = block.header.epochSyncDataHash
  event.latestProtocolVersion = block.header.latestProtocolVersion

  event.save()
}
