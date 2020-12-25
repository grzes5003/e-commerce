use std::cmp::Ordering;
use fake::{Dummy, Fake, Faker};
use fake::faker::name::en::Name;
use fake::faker::lorem::en::Words;
use rand::Rng;

#[derive(Debug)]
pub struct Product {
    pub id: u16,
    pub name: String,
    pub price: f32,
    pub description: String,
    pub category: u8,
}

impl Product {
    pub fn new(id: u16, name: String, price: f32, description: String, category: u8) -> Product {
        Product {
            id,
            name,
            price,
            description,
            category,
        }
    }

    pub fn new_dummy(id: u16, category: u8) -> Product {
        Product {
            id,
            name: Name().fake(),
            price: Faker.fake::<f32>() * 100.0,
            description: Words(10..20).fake::<Vec<String>>().join(" "),
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

#[derive(Debug)]
pub struct Category {
    pub id: u8,
    pub name: &'static str,
}

impl Category {
    pub fn new(id: u8, name: &'static str) -> Category {
        Category {
            id,
            name,
        }
    }
}

//// mock db

pub struct Database {
    pub categories: Vec<Category>,
    pub products: Vec<Product>,
}

impl Database {
    pub fn new(num_of_cat: u8, num_of_prod: u16) -> Database {
        let mut rng = rand::thread_rng();

        let cats = (0..num_of_cat).map(|x| Category { id: x, name: "name" }).collect();
        let prod = (0..num_of_prod)
            .map(|x|
                Product::new_dummy(x, rng.gen_range(0, num_of_cat)))
            .collect();

        Database {
            categories: cats,
            products: prod,
        }
    }
}
