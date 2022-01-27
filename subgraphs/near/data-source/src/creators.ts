import { near, BigInt, Bytes, json, JSONValue, TypedMap } from "@graphprotocol/graph-ts"
import { receipts as ReceiptsTemplate } from "../generated/templates"

export function handleCreation(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions
  if (!hasFunctionCall("create_token", actions)) {
    return
  }

  assert(receipt.outcome.logs.length == 1, "expected a single log for this method call")
  const nftContractCreatedEvent = json.fromString(receipt.outcome.logs[0])
  nftContractCreatedEvent.

  // {
  //   "standard": "endemic-nep171",
  //   "version": "1.0.0",
  //   "event": "nft_contract_created",
  //   "data": {
  //     "contract_account": "iko-80066038.factory.endemic.testnet",
  //     "owner_id": "imacek.testnet",
  //     "name": "Bome Slicice",
  //     "symbol": "IKO",
  //     "category": "Collectibles",
  //     "base_uri": "https://endemic.mypinata.cloud/ipfs"
  //   }
  // }
}

type NftContractCreatedEvent = {
  name: string
  contractAccount: string
  symbol: string
  category: string
  baseUri: string
}

function decodeNftContractCreatedEvent(event: JSONValue): NftContractCreatedEvent {
  const dataNode = event.toObject().get("data")
  if (dataNode)

  const data = event.toObject().get("data").toObject()
  for (let i = 0; i < )
}

function hasFunctionCall(name: string, actions: near.ActionValue[]): bool {
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i]

    if (
      action.kind == near.ActionKind.FUNCTION_CALL &&
      action.toFunctionCall().methodName == "name"
    ) {
      return true
    }
  }

  return false
}
