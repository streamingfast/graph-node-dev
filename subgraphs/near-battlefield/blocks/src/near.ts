import { Bytes, BigInt } from "@graphprotocol/graph-ts"

export declare namespace near {}

export namespace near {
  export class Block {
    constructor(
      public hash: Bytes,
      public parentHash: Bytes,
      public number: BigInt,
      public timestamp: BigInt
    ) {}
  }
}
