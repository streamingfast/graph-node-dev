extern crate core;

mod macros;
mod pb;

use crate::pb::network::{
    entity_change::Operation, field::Type as FieldType, EntitiesChanges, EntityChange, Field,
};
use bigdecimal::BigDecimal;
use num_bigint::BigInt;
use std::ops::Mul;
use std::str::FromStr;
use substreams::{errors::Error, log, Hex};
use substreams::store::{StoreSet, StoreGet};

use substreams_ethereum::pb::eth as ethpb;
use crate::ethpb::v2::{Block};


#[substreams::handlers::map]
fn graph_out(blk: Block) -> Result<EntitiesChanges, Error> {
    log::info!("processing block: {}", blk.number);

    let blk_hash = Hex(&blk.hash).to_string();
    let tx_count = BigInt::from_str(blk.transaction_traces.len().to_string().as_str()).unwrap();
    let mut size = BigDecimal::from(blk.size);
    size = size.mul(BigDecimal::from_str("2.3").unwrap());
    let block_num = blk.number.clone();
    let parent_hash = blk.header.unwrap().parent_hash;

    let mut out = EntitiesChanges {
        block_id: blk.hash.clone(),
        block_number: block_num,
        prev_block_id: parent_hash.clone(),
        prev_block_number: block_num - 1 as u64,
        ..Default::default()
    };

    out.entity_changes.push(EntityChange {
        entity: "Block".to_string(),
        id: string_field_value!(blk_hash),
        ordinal: 1,
        operation: Operation::Create as i32,
        fields: vec![
            new_field!("id", FieldType::String, string_field_value!(blk_hash)),
            new_field!("parentHash", FieldType::Bytes, parent_hash.to_vec()),
            new_field!("number", FieldType::Int, int_field_value!(blk.number)),
            new_field!("txCount", FieldType::Bigint, big_int_field_value!(tx_count)),
            new_field!(
                "size",
                FieldType::Bigdecimal,
                big_decimal_field_value!(size)
            ),
        ],
    });
    Ok(out)
}


#[substreams::handlers::store]
pub fn dummy_store(entitiesChanges: EntitiesChanges) {
  // does nothing
}
