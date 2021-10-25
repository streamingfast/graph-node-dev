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
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    return
  }

  const functionCall = action.toFunctionCall()
  if (functionCall.methodName != "sayGm") {
    return
  }

  let greeter = Greeter.load(receipt.signerId)
  if (greeter == null) {
    greeter = new Greeter(receipt.signerId)
    greeter.name = receipt.signerId
  }

  const greeting = new Greeting(receipt.id.toBase58())
  greeting.greeter = greeter.id
  greeting.timestamp = BigInt.fromI32(blockHeader.timestampNanosec as i32)
  greeting.save()

  greeter.greetings.push(greeting.id)
  greeter.save()
}
