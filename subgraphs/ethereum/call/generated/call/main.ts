// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class eventLogAll extends ethereum.Event {
  get params(): eventLogAll__Params {
    return new eventLogAll__Params(this);
  }
}

export class eventLogAll__Params {
  _event: eventLogAll;

  constructor(event: eventLogAll) {
    this._event = event;
  }

  get data(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get gas(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get sig(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get value(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class eventLogAllIndexed extends ethereum.Event {
  get params(): eventLogAllIndexed__Params {
    return new eventLogAllIndexed__Params(this);
  }
}

export class eventLogAllIndexed__Params {
  _event: eventLogAllIndexed;

  constructor(event: eventLogAllIndexed) {
    this._event = event;
  }

  get data(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get gas(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class eventLogEmpty extends ethereum.Event {
  get params(): eventLogEmpty__Params {
    return new eventLogEmpty__Params(this);
  }
}

export class eventLogEmpty__Params {
  _event: eventLogEmpty;

  constructor(event: eventLogEmpty) {
    this._event = event;
  }
}

export class eventLogMixedIndexed extends ethereum.Event {
  get params(): eventLogMixedIndexed__Params {
    return new eventLogMixedIndexed__Params(this);
  }
}

export class eventLogMixedIndexed__Params {
  _event: eventLogMixedIndexed;

  constructor(event: eventLogMixedIndexed) {
    this._event = event;
  }

  get data(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get gas(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get sig(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get value(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class eventLogSingle extends ethereum.Event {
  get params(): eventLogSingle__Params {
    return new eventLogSingle__Params(this);
  }
}

export class eventLogSingle__Params {
  _event: eventLogSingle;

  constructor(event: eventLogSingle) {
    this._event = event;
  }

  get payload(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get secondPayload(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class main extends ethereum.SmartContract {
  static bind(address: Address): main {
    return new main("main", address);
  }

  longStringInput(param0: string): BigInt {
    let result = super.call(
      "longStringInput",
      "longStringInput(string):(uint256)",
      [ethereum.Value.fromString(param0)]
    );

    return result[0].toBigInt();
  }

  try_longStringInput(param0: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "longStringInput",
      "longStringInput(string):(uint256)",
      [ethereum.Value.fromString(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  setLongString(): BigInt {
    let result = super.call("setLongString", "setLongString():(uint256)", []);

    return result[0].toBigInt();
  }

  try_setLongString(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "setLongString",
      "setLongString():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class AllPrecompiledCall extends ethereum.Call {
  get inputs(): AllPrecompiledCall__Inputs {
    return new AllPrecompiledCall__Inputs(this);
  }

  get outputs(): AllPrecompiledCall__Outputs {
    return new AllPrecompiledCall__Outputs(this);
  }
}

export class AllPrecompiledCall__Inputs {
  _call: AllPrecompiledCall;

  constructor(call: AllPrecompiledCall) {
    this._call = call;
  }
}

export class AllPrecompiledCall__Outputs {
  _call: AllPrecompiledCall;

  constructor(call: AllPrecompiledCall) {
    this._call = call;
  }
}

export class AssertFailureCall extends ethereum.Call {
  get inputs(): AssertFailureCall__Inputs {
    return new AssertFailureCall__Inputs(this);
  }

  get outputs(): AssertFailureCall__Outputs {
    return new AssertFailureCall__Outputs(this);
  }
}

export class AssertFailureCall__Inputs {
  _call: AssertFailureCall;

  constructor(call: AssertFailureCall) {
    this._call = call;
  }
}

export class AssertFailureCall__Outputs {
  _call: AssertFailureCall;

  constructor(call: AssertFailureCall) {
    this._call = call;
  }
}

export class CompleteCallTreeCall extends ethereum.Call {
  get inputs(): CompleteCallTreeCall__Inputs {
    return new CompleteCallTreeCall__Inputs(this);
  }

  get outputs(): CompleteCallTreeCall__Outputs {
    return new CompleteCallTreeCall__Outputs(this);
  }
}

export class CompleteCallTreeCall__Inputs {
  _call: CompleteCallTreeCall;

  constructor(call: CompleteCallTreeCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get grandChild(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class CompleteCallTreeCall__Outputs {
  _call: CompleteCallTreeCall;

  constructor(call: CompleteCallTreeCall) {
    this._call = call;
  }
}

export class ConsumeAllGasCall extends ethereum.Call {
  get inputs(): ConsumeAllGasCall__Inputs {
    return new ConsumeAllGasCall__Inputs(this);
  }

  get outputs(): ConsumeAllGasCall__Outputs {
    return new ConsumeAllGasCall__Outputs(this);
  }
}

export class ConsumeAllGasCall__Inputs {
  _call: ConsumeAllGasCall;

  constructor(call: ConsumeAllGasCall) {
    this._call = call;
  }
}

export class ConsumeAllGasCall__Outputs {
  _call: ConsumeAllGasCall;

  constructor(call: ConsumeAllGasCall) {
    this._call = call;
  }
}

export class ContracFailingRecursiveConstructorCall extends ethereum.Call {
  get inputs(): ContracFailingRecursiveConstructorCall__Inputs {
    return new ContracFailingRecursiveConstructorCall__Inputs(this);
  }

  get outputs(): ContracFailingRecursiveConstructorCall__Outputs {
    return new ContracFailingRecursiveConstructorCall__Outputs(this);
  }
}

export class ContracFailingRecursiveConstructorCall__Inputs {
  _call: ContracFailingRecursiveConstructorCall;

  constructor(call: ContracFailingRecursiveConstructorCall) {
    this._call = call;
  }
}

export class ContracFailingRecursiveConstructorCall__Outputs {
  _call: ContracFailingRecursiveConstructorCall;

  constructor(call: ContracFailingRecursiveConstructorCall) {
    this._call = call;
  }
}

export class ContractCreate2Call extends ethereum.Call {
  get inputs(): ContractCreate2Call__Inputs {
    return new ContractCreate2Call__Inputs(this);
  }

  get outputs(): ContractCreate2Call__Outputs {
    return new ContractCreate2Call__Outputs(this);
  }
}

export class ContractCreate2Call__Inputs {
  _call: ContractCreate2Call;

  constructor(call: ContractCreate2Call) {
    this._call = call;
  }

  get code(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get transferAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get salt(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get revertOnFailure(): boolean {
    return this._call.inputValues[3].value.toBoolean();
  }
}

export class ContractCreate2Call__Outputs {
  _call: ContractCreate2Call;

  constructor(call: ContractCreate2Call) {
    this._call = call;
  }
}

export class ContractWithConstructorCall extends ethereum.Call {
  get inputs(): ContractWithConstructorCall__Inputs {
    return new ContractWithConstructorCall__Inputs(this);
  }

  get outputs(): ContractWithConstructorCall__Outputs {
    return new ContractWithConstructorCall__Outputs(this);
  }
}

export class ContractWithConstructorCall__Inputs {
  _call: ContractWithConstructorCall;

  constructor(call: ContractWithConstructorCall) {
    this._call = call;
  }
}

export class ContractWithConstructorCall__Outputs {
  _call: ContractWithConstructorCall;

  constructor(call: ContractWithConstructorCall) {
    this._call = call;
  }
}

export class ContractWithEmptyConstructorCall extends ethereum.Call {
  get inputs(): ContractWithEmptyConstructorCall__Inputs {
    return new ContractWithEmptyConstructorCall__Inputs(this);
  }

  get outputs(): ContractWithEmptyConstructorCall__Outputs {
    return new ContractWithEmptyConstructorCall__Outputs(this);
  }
}

export class ContractWithEmptyConstructorCall__Inputs {
  _call: ContractWithEmptyConstructorCall;

  constructor(call: ContractWithEmptyConstructorCall) {
    this._call = call;
  }
}

export class ContractWithEmptyConstructorCall__Outputs {
  _call: ContractWithEmptyConstructorCall;

  constructor(call: ContractWithEmptyConstructorCall) {
    this._call = call;
  }
}

export class ContractWithFailingConstructorCall extends ethereum.Call {
  get inputs(): ContractWithFailingConstructorCall__Inputs {
    return new ContractWithFailingConstructorCall__Inputs(this);
  }

  get outputs(): ContractWithFailingConstructorCall__Outputs {
    return new ContractWithFailingConstructorCall__Outputs(this);
  }
}

export class ContractWithFailingConstructorCall__Inputs {
  _call: ContractWithFailingConstructorCall;

  constructor(call: ContractWithFailingConstructorCall) {
    this._call = call;
  }
}

export class ContractWithFailingConstructorCall__Outputs {
  _call: ContractWithFailingConstructorCall;

  constructor(call: ContractWithFailingConstructorCall) {
    this._call = call;
  }
}

export class DeepNestedLowGasCall extends ethereum.Call {
  get inputs(): DeepNestedLowGasCall__Inputs {
    return new DeepNestedLowGasCall__Inputs(this);
  }

  get outputs(): DeepNestedLowGasCall__Outputs {
    return new DeepNestedLowGasCall__Outputs(this);
  }
}

export class DeepNestedLowGasCall__Inputs {
  _call: DeepNestedLowGasCall;

  constructor(call: DeepNestedLowGasCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get grandChild(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class DeepNestedLowGasCall__Outputs {
  _call: DeepNestedLowGasCall;

  constructor(call: DeepNestedLowGasCall) {
    this._call = call;
  }
}

export class LogAllCall extends ethereum.Call {
  get inputs(): LogAllCall__Inputs {
    return new LogAllCall__Inputs(this);
  }

  get outputs(): LogAllCall__Outputs {
    return new LogAllCall__Outputs(this);
  }
}

export class LogAllCall__Inputs {
  _call: LogAllCall;

  constructor(call: LogAllCall) {
    this._call = call;
  }
}

export class LogAllCall__Outputs {
  _call: LogAllCall;

  constructor(call: LogAllCall) {
    this._call = call;
  }
}

export class LogAllIndexedCall extends ethereum.Call {
  get inputs(): LogAllIndexedCall__Inputs {
    return new LogAllIndexedCall__Inputs(this);
  }

  get outputs(): LogAllIndexedCall__Outputs {
    return new LogAllIndexedCall__Outputs(this);
  }
}

export class LogAllIndexedCall__Inputs {
  _call: LogAllIndexedCall;

  constructor(call: LogAllIndexedCall) {
    this._call = call;
  }
}

export class LogAllIndexedCall__Outputs {
  _call: LogAllIndexedCall;

  constructor(call: LogAllIndexedCall) {
    this._call = call;
  }
}

export class LogAllMixedCall extends ethereum.Call {
  get inputs(): LogAllMixedCall__Inputs {
    return new LogAllMixedCall__Inputs(this);
  }

  get outputs(): LogAllMixedCall__Outputs {
    return new LogAllMixedCall__Outputs(this);
  }
}

export class LogAllMixedCall__Inputs {
  _call: LogAllMixedCall;

  constructor(call: LogAllMixedCall) {
    this._call = call;
  }
}

export class LogAllMixedCall__Outputs {
  _call: LogAllMixedCall;

  constructor(call: LogAllMixedCall) {
    this._call = call;
  }
}

export class LogEmptyCall extends ethereum.Call {
  get inputs(): LogEmptyCall__Inputs {
    return new LogEmptyCall__Inputs(this);
  }

  get outputs(): LogEmptyCall__Outputs {
    return new LogEmptyCall__Outputs(this);
  }
}

export class LogEmptyCall__Inputs {
  _call: LogEmptyCall;

  constructor(call: LogEmptyCall) {
    this._call = call;
  }
}

export class LogEmptyCall__Outputs {
  _call: LogEmptyCall;

  constructor(call: LogEmptyCall) {
    this._call = call;
  }
}

export class LogMultiCall extends ethereum.Call {
  get inputs(): LogMultiCall__Inputs {
    return new LogMultiCall__Inputs(this);
  }

  get outputs(): LogMultiCall__Outputs {
    return new LogMultiCall__Outputs(this);
  }
}

export class LogMultiCall__Inputs {
  _call: LogMultiCall;

  constructor(call: LogMultiCall) {
    this._call = call;
  }
}

export class LogMultiCall__Outputs {
  _call: LogMultiCall;

  constructor(call: LogMultiCall) {
    this._call = call;
  }
}

export class LogSingleCall extends ethereum.Call {
  get inputs(): LogSingleCall__Inputs {
    return new LogSingleCall__Inputs(this);
  }

  get outputs(): LogSingleCall__Outputs {
    return new LogSingleCall__Outputs(this);
  }
}

export class LogSingleCall__Inputs {
  _call: LogSingleCall;

  constructor(call: LogSingleCall) {
    this._call = call;
  }
}

export class LogSingleCall__Outputs {
  _call: LogSingleCall;

  constructor(call: LogSingleCall) {
    this._call = call;
  }
}

export class NativeTransferCall extends ethereum.Call {
  get inputs(): NativeTransferCall__Inputs {
    return new NativeTransferCall__Inputs(this);
  }

  get outputs(): NativeTransferCall__Outputs {
    return new NativeTransferCall__Outputs(this);
  }
}

export class NativeTransferCall__Inputs {
  _call: NativeTransferCall;

  constructor(call: NativeTransferCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NativeTransferCall__Outputs {
  _call: NativeTransferCall;

  constructor(call: NativeTransferCall) {
    this._call = call;
  }
}

export class NestedAssertFailureCall extends ethereum.Call {
  get inputs(): NestedAssertFailureCall__Inputs {
    return new NestedAssertFailureCall__Inputs(this);
  }

  get outputs(): NestedAssertFailureCall__Outputs {
    return new NestedAssertFailureCall__Outputs(this);
  }
}

export class NestedAssertFailureCall__Inputs {
  _call: NestedAssertFailureCall;

  constructor(call: NestedAssertFailureCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NestedAssertFailureCall__Outputs {
  _call: NestedAssertFailureCall;

  constructor(call: NestedAssertFailureCall) {
    this._call = call;
  }
}

export class NestedFailtNativeTransferCall extends ethereum.Call {
  get inputs(): NestedFailtNativeTransferCall__Inputs {
    return new NestedFailtNativeTransferCall__Inputs(this);
  }

  get outputs(): NestedFailtNativeTransferCall__Outputs {
    return new NestedFailtNativeTransferCall__Outputs(this);
  }
}

export class NestedFailtNativeTransferCall__Inputs {
  _call: NestedFailtNativeTransferCall;

  constructor(call: NestedFailtNativeTransferCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class NestedFailtNativeTransferCall__Outputs {
  _call: NestedFailtNativeTransferCall;

  constructor(call: NestedFailtNativeTransferCall) {
    this._call = call;
  }
}

export class NestedLowGasCall extends ethereum.Call {
  get inputs(): NestedLowGasCall__Inputs {
    return new NestedLowGasCall__Inputs(this);
  }

  get outputs(): NestedLowGasCall__Outputs {
    return new NestedLowGasCall__Outputs(this);
  }
}

export class NestedLowGasCall__Inputs {
  _call: NestedLowGasCall;

  constructor(call: NestedLowGasCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NestedLowGasCall__Outputs {
  _call: NestedLowGasCall;

  constructor(call: NestedLowGasCall) {
    this._call = call;
  }
}

export class NestedNativeTransferCall extends ethereum.Call {
  get inputs(): NestedNativeTransferCall__Inputs {
    return new NestedNativeTransferCall__Inputs(this);
  }

  get outputs(): NestedNativeTransferCall__Outputs {
    return new NestedNativeTransferCall__Outputs(this);
  }
}

export class NestedNativeTransferCall__Inputs {
  _call: NestedNativeTransferCall;

  constructor(call: NestedNativeTransferCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class NestedNativeTransferCall__Outputs {
  _call: NestedNativeTransferCall;

  constructor(call: NestedNativeTransferCall) {
    this._call = call;
  }
}

export class NestedRevertFailureCall extends ethereum.Call {
  get inputs(): NestedRevertFailureCall__Inputs {
    return new NestedRevertFailureCall__Inputs(this);
  }

  get outputs(): NestedRevertFailureCall__Outputs {
    return new NestedRevertFailureCall__Outputs(this);
  }
}

export class NestedRevertFailureCall__Inputs {
  _call: NestedRevertFailureCall;

  constructor(call: NestedRevertFailureCall) {
    this._call = call;
  }

  get child(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NestedRevertFailureCall__Outputs {
  _call: NestedRevertFailureCall;

  constructor(call: NestedRevertFailureCall) {
    this._call = call;
  }
}

export class RevertFailureCall extends ethereum.Call {
  get inputs(): RevertFailureCall__Inputs {
    return new RevertFailureCall__Inputs(this);
  }

  get outputs(): RevertFailureCall__Outputs {
    return new RevertFailureCall__Outputs(this);
  }
}

export class RevertFailureCall__Inputs {
  _call: RevertFailureCall;

  constructor(call: RevertFailureCall) {
    this._call = call;
  }
}

export class RevertFailureCall__Outputs {
  _call: RevertFailureCall;

  constructor(call: RevertFailureCall) {
    this._call = call;
  }
}

export class SetAfterCall extends ethereum.Call {
  get inputs(): SetAfterCall__Inputs {
    return new SetAfterCall__Inputs(this);
  }

  get outputs(): SetAfterCall__Outputs {
    return new SetAfterCall__Outputs(this);
  }
}

export class SetAfterCall__Inputs {
  _call: SetAfterCall;

  constructor(call: SetAfterCall) {
    this._call = call;
  }
}

export class SetAfterCall__Outputs {
  _call: SetAfterCall;

  constructor(call: SetAfterCall) {
    this._call = call;
  }
}

export class SetLongStringCall extends ethereum.Call {
  get inputs(): SetLongStringCall__Inputs {
    return new SetLongStringCall__Inputs(this);
  }

  get outputs(): SetLongStringCall__Outputs {
    return new SetLongStringCall__Outputs(this);
  }
}

export class SetLongStringCall__Inputs {
  _call: SetLongStringCall;

  constructor(call: SetLongStringCall) {
    this._call = call;
  }
}

export class SetLongStringCall__Outputs {
  _call: SetLongStringCall;

  constructor(call: SetLongStringCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}
