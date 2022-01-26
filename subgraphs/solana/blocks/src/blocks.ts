import {solana, BigInt, log} from "@graphprotocol/graph-ts"
import { BlockEvent } from "../generated/schema"

export function handleBlock(block: solana.Block): void {
  let event = new BlockEvent(block.id.toHexString())
  event.number = BigInt.fromU64(block.number)
  event.save()
}