import { Bytes, ethereum, log } from "@graphprotocol/graph-ts"
import { ContractCreate2Call } from "../generated/call/main"
import { Payment } from "../generated/schema"
import { Exchange } from "../generated/templates"

export function handleCreateCall(call: ethereum.Call): void {
  if (call.to.toHexString() === "0x929bc44bbd41ca0e621dc50f7c7e3204ce026258") {
  }

  payment.save()
}
