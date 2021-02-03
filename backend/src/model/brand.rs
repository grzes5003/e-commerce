use serde::{Serialize, Deserialize};
use crate::model::product::Product;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Brand {
    pub id: u8,
    pub name: String,
}

impl From<(u8, String)> for Brand {
    fn from(tuple: (u8, String)) -> Self {
        Brand {
            id: tuple.0,
            name: tuple.1
        }
    }
}
