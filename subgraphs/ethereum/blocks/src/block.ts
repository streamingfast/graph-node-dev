import { Block } from "../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"

export function handleBlock(block: ethereum.Block): void {
  let id = block.hash.toHex()

  let entity = new Block(id)
  entity.number = block.number
  entity.save()
}
