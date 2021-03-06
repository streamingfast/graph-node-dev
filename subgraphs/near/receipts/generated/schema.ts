// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ReceiptEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("blockHeight", Value.fromBigInt(BigInt.zero()));
    this.set("outcome", Value.fromString(""));
    this.set("predecessorId", Value.fromString(""));
    this.set("receiverId", Value.fromString(""));
    this.set("signerId", Value.fromString(""));
    this.set("signerPublicKey", Value.fromString(""));
    this.set("gasPrice", Value.fromBigInt(BigInt.zero()));
    this.set("inputDataIds", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ReceiptEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ReceiptEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ReceiptEvent", id.toString(), this);
    }
  }

  static load(id: string): ReceiptEvent | null {
    return changetype<ReceiptEvent | null>(store.get("ReceiptEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockHeight(): BigInt {
    let value = this.get("blockHeight");
    return value!.toBigInt();
  }

  set blockHeight(value: BigInt) {
    this.set("blockHeight", Value.fromBigInt(value));
  }

  get outcome(): string {
    let value = this.get("outcome");
    return value!.toString();
  }

  set outcome(value: string) {
    this.set("outcome", Value.fromString(value));
  }

  get predecessorId(): string {
    let value = this.get("predecessorId");
    return value!.toString();
  }

  set predecessorId(value: string) {
    this.set("predecessorId", Value.fromString(value));
  }

  get receiverId(): string {
    let value = this.get("receiverId");
    return value!.toString();
  }

  set receiverId(value: string) {
    this.set("receiverId", Value.fromString(value));
  }

  get signerId(): string {
    let value = this.get("signerId");
    return value!.toString();
  }

  set signerId(value: string) {
    this.set("signerId", Value.fromString(value));
  }

  get signerPublicKey(): string {
    let value = this.get("signerPublicKey");
    return value!.toString();
  }

  set signerPublicKey(value: string) {
    this.set("signerPublicKey", Value.fromString(value));
  }

  get gasPrice(): BigInt {
    let value = this.get("gasPrice");
    return value!.toBigInt();
  }

  set gasPrice(value: BigInt) {
    this.set("gasPrice", Value.fromBigInt(value));
  }

  get inputDataIds(): Array<string> {
    let value = this.get("inputDataIds");
    return value!.toStringArray();
  }

  set inputDataIds(value: Array<string>) {
    this.set("inputDataIds", Value.fromStringArray(value));
  }
}

export class ExecutionOutcome extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("gasBurnt", Value.fromBigInt(BigInt.zero()));
    this.set("blockHash", Value.fromString(""));
    this.set("logs", Value.fromStringArray(new Array(0)));
    this.set("receiptIds", Value.fromStringArray(new Array(0)));
    this.set("tokensBurnt", Value.fromBigInt(BigInt.zero()));
    this.set("executorId", Value.fromString(""));
    this.set("status", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExecutionOutcome entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ExecutionOutcome entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ExecutionOutcome", id.toString(), this);
    }
  }

  static load(id: string): ExecutionOutcome | null {
    return changetype<ExecutionOutcome | null>(
      store.get("ExecutionOutcome", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gasBurnt(): BigInt {
    let value = this.get("gasBurnt");
    return value!.toBigInt();
  }

  set gasBurnt(value: BigInt) {
    this.set("gasBurnt", Value.fromBigInt(value));
  }

  get blockHash(): string {
    let value = this.get("blockHash");
    return value!.toString();
  }

  set blockHash(value: string) {
    this.set("blockHash", Value.fromString(value));
  }

  get logs(): Array<string> {
    let value = this.get("logs");
    return value!.toStringArray();
  }

  set logs(value: Array<string>) {
    this.set("logs", Value.fromStringArray(value));
  }

  get receiptIds(): Array<string> {
    let value = this.get("receiptIds");
    return value!.toStringArray();
  }

  set receiptIds(value: Array<string>) {
    this.set("receiptIds", Value.fromStringArray(value));
  }

  get tokensBurnt(): BigInt {
    let value = this.get("tokensBurnt");
    return value!.toBigInt();
  }

  set tokensBurnt(value: BigInt) {
    this.set("tokensBurnt", Value.fromBigInt(value));
  }

  get executorId(): string {
    let value = this.get("executorId");
    return value!.toString();
  }

  set executorId(value: string) {
    this.set("executorId", Value.fromString(value));
  }

  get status(): i32 {
    let value = this.get("status");
    return value!.toI32();
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }
}

export class CreateAccountActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save CreateAccountActionEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save CreateAccountActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("CreateAccountActionEvent", id.toString(), this);
    }
  }

  static load(id: string): CreateAccountActionEvent | null {
    return changetype<CreateAccountActionEvent | null>(
      store.get("CreateAccountActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class DeployContractActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save DeployContractActionEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DeployContractActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DeployContractActionEvent", id.toString(), this);
    }
  }

  static load(id: string): DeployContractActionEvent | null {
    return changetype<DeployContractActionEvent | null>(
      store.get("DeployContractActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class FunctionCallActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("method", Value.fromString(""));
    this.set("args", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save FunctionCallActionEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save FunctionCallActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("FunctionCallActionEvent", id.toString(), this);
    }
  }

  static load(id: string): FunctionCallActionEvent | null {
    return changetype<FunctionCallActionEvent | null>(
      store.get("FunctionCallActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get method(): string {
    let value = this.get("method");
    return value!.toString();
  }

  set method(value: string) {
    this.set("method", Value.fromString(value));
  }

  get args(): Bytes {
    let value = this.get("args");
    return value!.toBytes();
  }

  set args(value: Bytes) {
    this.set("args", Value.fromBytes(value));
  }
}

export class TransferActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferActionEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save TransferActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("TransferActionEvent", id.toString(), this);
    }
  }

  static load(id: string): TransferActionEvent | null {
    return changetype<TransferActionEvent | null>(
      store.get("TransferActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class StakeActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save StakeActionEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save StakeActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("StakeActionEvent", id.toString(), this);
    }
  }

  static load(id: string): StakeActionEvent | null {
    return changetype<StakeActionEvent | null>(
      store.get("StakeActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class AddKeyActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AddKeyActionEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AddKeyActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AddKeyActionEvent", id.toString(), this);
    }
  }

  static load(id: string): AddKeyActionEvent | null {
    return changetype<AddKeyActionEvent | null>(
      store.get("AddKeyActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class DeleteKeyActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DeleteKeyActionEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DeleteKeyActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DeleteKeyActionEvent", id.toString(), this);
    }
  }

  static load(id: string): DeleteKeyActionEvent | null {
    return changetype<DeleteKeyActionEvent | null>(
      store.get("DeleteKeyActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class DeleteAccountActionEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save DeleteAccountActionEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DeleteAccountActionEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DeleteAccountActionEvent", id.toString(), this);
    }
  }

  static load(id: string): DeleteAccountActionEvent | null {
    return changetype<DeleteAccountActionEvent | null>(
      store.get("DeleteAccountActionEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}
