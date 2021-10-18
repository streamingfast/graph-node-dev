import { near } from "@graphprotocol/graph-ts/chain/near"

export function handleBlock(block: near.Block): void {
  const header = block.header
  let event = new BlockEvent(header.hash.toHexString())
  event.number = header.height

  event.save()
}
