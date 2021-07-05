import { BigDecimal, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { Transfer } from "../../generated/Factory/Factory";
import { Payment } from "../../generated/schema";

export function handleTransfer(event: Transfer): void {

    let payment = new Payment("1");
    payment.from = event.transaction.from.toHex();
    payment.to = event.transaction.to.toHex();
    payment.value = event.transaction.value;

    if (event.block.number.toI32() < 10548625 + 10000) {
        payment.save();
    }
}