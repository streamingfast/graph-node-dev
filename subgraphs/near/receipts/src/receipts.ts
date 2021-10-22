import { near, BigInt, Bytes } from "@graphprotocol/graph-ts"
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

  const outcome = new ExecutionOutcome(receiptId)
  outcome.gasBurnt = BigInt.fromI32(receipt.outcome.gasBurnt as i32)
  outcome.blockHash = receipt.outcome.blockHash.toBase58()
  outcome.logs = receipt.outcome.logs
  outcome.receiptIds = bytesArrayToStringArray(receipt.outcome.receiptIds)
  outcome.tokensBurnt = receipt.outcome.tokensBurnt
  outcome.executorId = receipt.outcome.executorId
  outcome.status = receipt.outcome.status.kind
  outcome.save()

  const event = new ReceiptEvent(receiptId)
  event.blockHeight = BigInt.fromI32(receipt.block.header.height as i32)
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
  if (action.kind === near.ActionKind.CREATE_ACCOUNT) {
    const event = new CreateAccountActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind === near.ActionKind.DEPLOY_CONTRACT) {
    const event = new DeployContractActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind === near.ActionKind.FUNCTION_CALL) {
    const value = action.toFunctionCall()
    const event = new FunctionCallActionEvent(receiptId + "-" + index.toString())
    event.method = value.methodName
    event.args = value.args

    event.save()

    return
  }

  if (action.kind === near.ActionKind.TRANSFER) {
    const event = new TransferActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind === near.ActionKind.STAKE) {
    const event = new StakeActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind === near.ActionKind.ADD_KEY) {
    const event = new AddKeyActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind === near.ActionKind.DELETE_KEY) {
    const event = new DeleteKeyActionEvent(receiptId + "-" + index.toString())
    event.save()

    return
  }

  if (action.kind === near.ActionKind.DELETE_ACCOUNT) {
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
