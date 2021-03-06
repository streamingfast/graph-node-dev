import {solana, BigInt, Bytes, log} from "@graphprotocol/graph-ts"
import {
} from "../generated/schema"

export function handleInstruction(instruction: solana.InstructionWithBlock): void {
  const programId = instruction.instruction.programId.toBase58()
  log.info("Handling instruction for program {} in block {}", [programId, instruction.block_num.toString()])

  for (let i = 0; i < instruction.instruction.log_messages.length; i++) {
    log.info("info: {}", [instruction.instruction.log_messages[i]]);
  }
  log.info("next!",[]);
}

function bytesArrayToStringArray(values: Bytes[]): string[] {
  const strings: string[] = []
  for (let i = 0; i < values.length; i++) {
    strings.push(values[i].toBase58())
  }

  return strings
}
