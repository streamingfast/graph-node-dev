import { near, BigInt } from "@graphprotocol/graph-ts"
import { Greeter, Greeting } from "../generated/schema"

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions
  for (let i = 0; i < actions.length; i++) {
    handleAction(actions[i], receipt.receipt, receipt.block.header)
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader
): void {
  let greeter = Greeter.load(receipt.signerId)
  if (greeter == null) {
    greeter = new Greeter(receipt.signerId)
  }

  const greeting = new Greeting(receipt.id.toHexString())
  greeting.greeter = receipt.signerId
  greeting.timestamp = BigInt.fromI32(blockHeader.timestampNanosec as i32)
  greeting.save()

  greeter.greetings.push(greeting.id)
  greeter.save()
}
