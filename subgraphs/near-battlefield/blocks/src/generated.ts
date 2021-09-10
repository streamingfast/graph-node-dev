import { Entity, Value, ValueKind, store, BigInt } from "@graphprotocol/graph-ts"

export class BlockEvent extends Entity {
  constructor(id: string) {
    super()
    this.set("id", Value.fromString(id))
  }

  save(): void {
    let id = this.get("id")
    assert(id !== null, "Cannot save BlockEvent entity without an ID")
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save BlockEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    )
    store.set("BlockEvent", id.toString(), this)
  }

  static load(id: string): BlockEvent | null {
    return store.get("BlockEvent", id) as BlockEvent | null
  }

  get id(): string {
    let value = this.get("id")
    return value.toString()
  }

  set id(value: string) {
    this.set("id", Value.fromString(value))
  }

  get number(): BigInt {
    let value = this.get("number")
    return value.toBigInt()
  }

  set number(value: BigInt) {
    this.set("number", Value.fromBigInt(value))
  }
}
