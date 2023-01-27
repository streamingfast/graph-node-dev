import { arweave, BigInt, log } from "@graphprotocol/graph-ts"
import { Block, Transaction } from "../generated/schema"

export function handleBlock(block: arweave.Block): void {
  let entity = new Block(block.indepHash.toHexString())
  entity.block_id = toBase64(block.indepHash)
  entity.height = BigInt.fromU64(block.height)
  entity.previous_id = toBase64(block.previousBlock)

  entity.save()
}

export function handleTx(tb: arweave.TransactionWithBlockPtr): void {
  const tx = tb.tx
  const entity = new Transaction(tx.id.toHexString())

  log.info("tx bytes {} base64url {} block height {}", [
    tx.id.toHexString(),
    toBase64(tx.id),
    BigInt.fromU64(tb.block.height).toString(),
  ])

  entity.block_id = toBase64(tb.block.indepHash)
  entity.block_height = BigInt.fromU64(tb.block.height)
  entity.block_id = toBase64(tb.block.indepHash)
  entity.tx_id = toBase64(tx.id)
  entity.last_tx = toBase64(tx.lastTx)
  entity.owner = toBase64(tx.owner)
  entity.data = tx.data
  entity.data_root = toBase64(tx.dataRoot)
  entity.data_size = tx.dataSize
  entity.target = tx.target
  entity.quantity = tx.quantity
  entity.signature = tx.signature
  entity.reward = tx.reward

  entity.save()
}

export function toBase64(bytes: Uint8Array): string {
  return bytesToBase64(bytes, true)
}

const base64Alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "/",
]

const base64UrlAlphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "-",
  "_",
]

function bytesToBase64(bytes: Uint8Array, urlSafe: boolean): string {
  let alphabet = urlSafe ? base64UrlAlphabet : base64Alphabet

  let result = "",
    i: i32,
    l = bytes.length
  for (i = 2; i < l; i += 3) {
    result += alphabet[bytes[i - 2] >> 2]
    result += alphabet[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += alphabet[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)]
    result += alphabet[bytes[i] & 0x3f]
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += alphabet[bytes[i - 2] >> 2]
    result += alphabet[(bytes[i - 2] & 0x03) << 4]
    if (!urlSafe) {
      result += "=="
    }
  }
  if (!urlSafe && i === l) {
    // 2 octets yet to write
    result += alphabet[bytes[i - 2] >> 2]
    result += alphabet[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += alphabet[(bytes[i - 1] & 0x0f) << 2]
    if (!urlSafe) {
      result += "="
    }
  }
  return result
}
