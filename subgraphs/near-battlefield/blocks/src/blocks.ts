import { near } from "./near"
import { BlockEvent } from "./generated"

export function handleBlock(block: near.Block): void {
  let event = new BlockEvent(block.hash.toHexString())
  event.number = block.number

  event.save()
}
