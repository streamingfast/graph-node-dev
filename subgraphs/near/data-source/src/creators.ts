import { near, BigInt, Bytes, json, JSONValue, TypedMap, log } from "@graphprotocol/graph-ts"
import { receipts as ReceiptsTemplate } from "../generated/templates"

export function handleCreation(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions
  if (!hasFunctionCall("create_token", actions)) {
    log.info("no fonction create_token called", [])
    return
  }

  assert(receipt.outcome.logs.length == 1, "expected a single log for this method call")
  const nftContractCreatedEvent = decodeNftContractCreatedEvent(
    json.fromString(receipt.outcome.logs[0])
  )

  ReceiptsTemplate.create(nftContractCreatedEvent.contractAccount)
}

class NftContractCreatedEvent {
  name: string
  contractAccount: string
  symbol: string
  category: string
  baseUri: string
}

function decodeNftContractCreatedEvent(event: JSONValue): NftContractCreatedEvent {
  const dataNode = event.toObject().mustGet("data").toObject()

  const out: NftContractCreatedEvent = {
    name: "",
    contractAccount: "",
    symbol: "",
    category: "",
    baseUri: "",
  }
  for (let i = 0; i < dataNode.entries.length; i++) {
    const entry = dataNode.entries[i]
    if (entry.key == "name") {
      out.name = entry.value.toString()
    } else if (entry.key == "contract_account") {
      out.contractAccount = entry.value.toString()
    } else if (entry.key == "symbol") {
      out.symbol = entry.value.toString()
    } else if (entry.key == "category") {
      out.category = entry.value.toString()
    } else if (entry.key == "base_uri") {
      out.baseUri = entry.value.toString()
    }
  }

  return out
}

function hasFunctionCall(name: string, actions: near.ActionValue[]): bool {
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i]

    if (
      action.kind == near.ActionKind.FUNCTION_CALL &&
      action.toFunctionCall().methodName == name
    ) {
      return true
    }
  }

  return false
}
