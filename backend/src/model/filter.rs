use serde::{Serialize, Deserialize};
use std::fmt;

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Order {
    ASC,
    DESC,
}

impl fmt::Display for Order {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Param {
    NAME,
    PRICE,
}

impl fmt::Display for Param {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Param::NAME => write!(f, "name"),
            Param::PRICE => write!(f, "price"),
        }
    }
}

#[derive(Deserialize, Debug)]
pub struct Filter {
    pub cat: u8,
    pub offset: u32,
    pub limit: u16,
    pub sort: Param,
    pub order: Order,
}
