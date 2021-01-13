use std::cmp::Ordering;
use fake::{Dummy, Fake, Faker};
use fake::faker::name::en::Name;
use fake::faker::lorem::en::Words;
use rand::Rng;
use serde::{Serialize, Deserialize};
use fake::faker::company::en::Buzzword;
use std::fs;
// use serde_json::Error;
use std::io;

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

pub trait CmpPrice {
    fn cmp(&self, other: &Self) -> Ordering;
    fn partial_cmp(&self, other: &Self) -> Option<Ordering>;
    fn eq(&self, other: &Self) -> bool;
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

pub trait CmpName {
    fn cmp(&self, other: &Self) -> Ordering;
    fn partial_cmp(&self, other: &Self) -> Option<Ordering>;
    fn eq(&self, other: &Self) -> bool;
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

///// Category

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Category {
    pub id: u8,
    pub name: String,
}

impl Category {
    pub fn new(id: u8, name: String) -> Category {
        Category {
            id,
            name,
        }
    }
}

//// mock db

#[derive(Clone)]
pub struct Database {
    pub categories: Vec<Category>,
    pub products: Vec<Product>,
}

impl Database {
    pub fn new(num_of_cat: u8, num_of_prod: u16) -> Database {
        let mut rng = rand::thread_rng();

        let cats = (0..num_of_cat).map(|x| Category { id: x, name: Buzzword().fake() }).collect();
        let prod = (0..num_of_prod)
            .map(|x|
                Product::new_dummy(x, rng.gen_range(0, num_of_cat)))
            .collect();

        Database {
            categories: cats,
            products: prod,
        }
    }

    pub fn new_from_file(products_path: &str, categories_path: &str) -> Result<Database, io::Error> {
        let s_product_data = fs::read_to_string(products_path)?;
        let v_product: Vec<Product> = serde_json::from_str(s_product_data.as_str())?;

        let s_category_data = fs::read_to_string(categories_path)?;
        let v_category: Vec<Category> = serde_json::from_str(s_category_data.as_str())?;

        Ok(Database {
            categories: v_category,
            products: v_product
        })
    }
}
