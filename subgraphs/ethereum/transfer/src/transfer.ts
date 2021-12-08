import { Transfer, TransferCall } from "../generated/transfer/transfer"
import { Payment } from "../generated/schema"

export function handleTransferEvent(event: Transfer): void {
  let payment = new Payment(event.block.number.toString())
  payment.from = event.transaction.from.toHex()
  payment.to = event.transaction.to!.toHex()
  payment.value = event.transaction.value

  payment.save()
}

export function handleTransferCall(call: TransferCall): void {
  let payment = new Payment(call.block.number.toString())
  payment.from = call.from.toHex()
  payment.to = call.inputs._to.toHex()
  payment.value = call.inputs._value
  payment.save()
}
