use serde::{Serialize, Deserialize};
use crate::model::product::Product;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Order {
    pub id: u8,
    pub desc: String,
    pub purchase_dtime: String,
    pub price: f32,
    pub products: Vec<Product>
}

impl From<(u8, String, String, f32, Vec<Product>)> for Order {
    fn from(tuple: (u8, String, String, f32, Vec<Product>)) -> Self {
        Order {
            id: tuple.0,
            desc: tuple.1,
            purchase_dtime: tuple.2,
            price: tuple.3,
            products: tuple.4
        }
    }
}
