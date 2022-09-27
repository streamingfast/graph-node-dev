import { Transfer, transfer } from "../generated/transfer/transfer"
import { Payment } from "../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"

export function handleTransferEvent(event: Transfer): void {
  let payment = new Payment(event.block.number.toString())
  payment.from = event.transaction.from.toHex()
  payment.to = event.transaction.to!.toHex()
  payment.value = event.transaction.value

  payment.balance_from = transfer.bind(event.address).balanceOf(event.transaction.from)
  payment.balance_to = transfer.bind(event.address).balanceOf(event.transaction.to!)

  payment.save()
}
