use serde::{Serialize, Deserialize};

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Order {
    ASC,
    DESC,
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Param {
    NAME,
    PRICE,
}

#[derive(Deserialize, Debug)]
pub struct Filter {
    pub cat: u8,
    pub offset: u32,
    pub limit: u16,
    pub sort: Param,
    pub order: Order,
}
