use serde::{Serialize, Deserialize};
use fake::{Dummy, Fake, Faker};
use fake::faker::name::en::Name;
use fake::faker::lorem::en::Words;
use crate::model::cmp::{CmpName, CmpPrice};
use std::cmp::Ordering;

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Product {
    pub id: u16,
    pub name: String,
    pub price: f32,
    pub description: String,
    #[serde(rename(deserialize = "cat"))]
    pub category: u8,
    pub brand: String
}

impl Product {
    pub fn new(id: u16, name: String, price: f32, description: String, category: u8, brand: String) -> Product {
        Product {
            id,
            name,
            price,
            description,
            category,
            brand
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
