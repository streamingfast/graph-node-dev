import { Bytes, log } from "@graphprotocol/graph-ts"
import { ContractCreate2Call } from "../generated/call/main"
import { Payment } from "../generated/schema"

export function handleContractCreate2(call: ContractCreate2Call): void {
  let payment = new Payment(call.block.number.toString())
  payment.from = call.from.toHex()
  payment.to = call.to.toHex()

  log.info("Input Parameters ({}:{}, {}:{}, {}:{}, {}:{})", [
    call.inputValues[0].name,
    call.inputValues[0].value.toBytes().toHexString(),
    call.inputValues[1].name,
    call.inputValues[1].value.toBigInt().toString(),
    call.inputValues[2].name,
    call.inputValues[2].value.toBigInt().toString(),
    call.inputValues[3].name,
    call.inputValues[3].value.toBoolean() == true ? "true" : "false",
  ])

  payment.value = call.inputValues[1].value.toBigInt()
  payment.input = new Bytes(0)

  payment.save()
}
