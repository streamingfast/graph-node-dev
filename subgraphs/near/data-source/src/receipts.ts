import { near, BigInt, Bytes, json, JSONValue, TypedMap } from "@graphprotocol/graph-ts"
import {
  ReceiptEvent,
  ExecutionOutcome,
  CreateAccountActionEvent,
  DeployContractActionEvent,
  FunctionCallActionEvent,
  TransferActionEvent,
  StakeActionEvent,
  AddKeyActionEvent,
  DeleteKeyActionEvent,
  DeleteAccountActionEvent,
} from "../generated/schema"

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const receiptId = receipt.receipt.id.toBase58()
  const status = receipt.outcome.status

  const outcome = new ExecutionOutcome(receiptId)
  outcome.gasBurnt = BigInt.fromU64(receipt.outcome.gasBurnt)
  outcome.blockHash = receipt.outcome.blockHash.toBase58()
  outcome.logs = receipt.outcome.logs
  outcome.receiptIds = bytesArrayToStringArray(receipt.outcome.receiptIds)
  outcome.tokensBurnt = receipt.outcome.tokensBurnt
  outcome.executorId = receipt.outcome.executorId
  outcome.status = status.kind

  if (receipt.outcome.status.kind == near.SuccessStatusKind.VALUE) {
    const returnBytes = status.toValue()
    const returnValues = json.fromBytes(returnBytes).toArray()
    const firstValue = returnValues[0].toObject()

    // Each `get` iterates through all entries to find the element. If you need to process each field,
    // it's more efficient to iterate on `firstValue.entries` and have a big `switch` case that do
    // something differently for each field.
    const id = mustGet(firstValue, "id")?.toString()
  }

  outcome.save()

  const event = new ReceiptEvent(receiptId)
  event.blockHeight = BigInt.fromU64(receipt.block.header.height)
  event.outcome = outcome.id
  event.predecessorId = receipt.receipt.predecessorId
  event.receiverId = receipt.receipt.receiverId
  event.signerId = receipt.receipt.signerId
  event.signerPublicKey = receipt.receipt.signerPublicKey.bytes.toBase58()
  event.gasPrice = receipt.receipt.gasPrice
  event.inputDataIds = bytesArrayToStringArray(receipt.receipt.inputDataIds)
  event.save()

  const actions = receipt.receipt.actions
  for (let i = 0; i < actions.length; i++) {
    handleAction(i, actions[i], receiptId)
  }
}

function handleAction(index: i32, action: near.ActionValue, receiptId: string): void {
  if (action.kind == near.ActionKind.CREATE_ACCOUNT) {
    const event = new CreateAccountActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind == near.ActionKind.DEPLOY_CONTRACT) {
    const event = new DeployContractActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind == near.ActionKind.FUNCTION_CALL) {
    const value = action.toFunctionCall()
    const event = new FunctionCallActionEvent(receiptId + "-" + index.toString())
    event.method = value.methodName
    event.args = value.args

    event.save()

    return
  }

  if (action.kind == near.ActionKind.TRANSFER) {
    const event = new TransferActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind == near.ActionKind.STAKE) {
    const event = new StakeActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind == near.ActionKind.ADD_KEY) {
    const event = new AddKeyActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind == near.ActionKind.DELETE_KEY) {
    const event = new DeleteKeyActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind == near.ActionKind.DELETE_ACCOUNT) {
    const event = new DeleteAccountActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }
}

function bytesArrayToStringArray(values: Bytes[]): string[] {
  const strings: string[] = []
  for (let i = 0; i < values.length; i++) {
    strings.push(values[i].toBase58())
  }

  return strings
}

function mustGet(value: TypedMap<string, JSONValue>, key: string): JSONValue {
  const out = value.get(key)
  assert(out != null, `JSON key ${key} is not found in JSON Object.`)

  return out!
}
