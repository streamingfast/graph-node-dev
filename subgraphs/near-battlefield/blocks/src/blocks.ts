import { near, BigInt } from "@graphprotocol/graph-ts"
import { BlockEvent } from "../generated/schema"

export function handleBlock(block: near.Block): void {
  const header = block.header
  let event = new BlockEvent(header.hash.toHexString())
  event.number = new BigInt(header.height as i32)

  event.save()
}
