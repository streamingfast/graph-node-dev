import { Transfer } from "../generated/transfer/transfer"
import { Payment } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let payment = new Payment(event.block.number.toString())
  payment.from = event.transaction.from.toHex()
  payment.to = event.transaction.to.toHex()
  payment.value = event.transaction.value

  payment.save()
}
