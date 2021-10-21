import { near, BigInt } from "@graphprotocol/graph-ts"
import { ReceiptEvent } from "../generated/schema"

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  let event = new ReceiptEvent(receipt.block.header.hash.toHexString())

  event.blockHeight = BigInt.fromI32(receipt.block.header.height as i32)
  event.signerId = receipt.receipt.signerId
  event.receiverId = receipt.receipt.receiverId

  event.save()
}
