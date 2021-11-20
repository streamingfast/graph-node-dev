import { near } from "@graphprotocol/graph-ts"
import { ActionInfo, DataReceiver } from "../generated/schema"

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const receiptId = receipt.receipt.id.toHexString()
  const action = new ActionInfo(receiptId)

  const dataReceivers = receipt.receipt.outputDataReceivers
  for (let i = 0; i < dataReceivers.length; i++) {
    const dataReceiver = new DataReceiver(`${receiptId}-${i}`)
    dataReceiver.dataId = dataReceivers[i].dataId
    dataReceiver.receiverId = dataReceivers[i].receiverId
    dataReceiver.save()

    action.dataReceivers.push(dataReceiver.id)
  }

  action.save()
}
