use serde::{Serialize, Deserialize};
use fake::{Dummy, Fake, Faker};
use fake::faker::name::en::Name;
use fake::faker::lorem::en::Words;
use crate::model::cmp::{CmpName, CmpPrice};
use std::cmp::Ordering;
use mysql::{Row, from_value};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Product {
    pub id: u16,
    pub name: String,
    pub price: f32,
    pub description: String,
    #[serde(rename(deserialize = "cat"))]
    pub category: u8,
    pub brand: String,
    pub picture: String,
    pub units_in_stock: u32,
}

impl Product {
    pub fn new(id: u16, name: String, price: f32, description: String, category: u8, brand: String, picture: String, units_in_stock: u32) -> Product {
        Product {
            id,
            name,
            price,
            category,
            brand,
            description,
            picture,
            units_in_stock
        }
    }

    pub fn new_dummy(id: u16, category: u8) -> Product {
        Product {
            id,
            name: Name().fake(),
            price: Faker.fake::<f32>() * 100.0,
            description: Words(10..20).fake::<Vec<String>>().join(" "),
            brand: Name().fake(),
            category,
            picture: String::from(""),
            units_in_stock: 10
        }
    }

    pub fn from_row(row: Row) -> Product {
        let row_ = row.unwrap();

        Product {
            id: from_value(row_[0].to_owned()),
            name: from_value(row_[1].to_owned()),
            price: from_value(row_[2].to_owned()),
            description: from_value(row_[3].to_owned()),
            category: from_value(row_[4].to_owned()),
            brand: from_value(row_[5].to_owned()),
            picture: from_value(row_[6].to_owned()),
            units_in_stock: from_value(row_[7].to_owned())
        }
    }
}

impl From<(u16, String, f32, u8, String, String, String, u32)> for Product {
    fn from(tuple: (u16, String, f32, u8, String, String, String, u32)) -> Self {
        Product {
            id: tuple.0,
            name: tuple.1,
            price: tuple.2,
            category: tuple.3,
            brand: tuple.4,
            description: tuple.5,
            picture: tuple.6,
            units_in_stock: tuple.7
        }
    }
}

impl CmpPrice for Product {
    fn cmp(&self, other: &Self) -> Ordering {
        match self.price > other.price {
            true => Ordering::Greater,
            false => match self.price == other.price {
                true => Ordering::Equal,
                false => Ordering::Less
            }
        }
    }
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(<Product as CmpPrice>::cmp(&self, &other))
    }
    fn eq(&self, other: &Self) -> bool {
        self.price == other.price
    }
}

impl CmpName for Product {
    fn cmp(&self, other: &Self) -> Ordering {
        self.name.cmp(&other.name)
    }
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(<Product as CmpName>::cmp(&self, &other))
    }
    fn eq(&self, other: &Self) -> bool {
        self.name == other.name
    }
}
