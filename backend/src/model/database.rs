use actix_web::web::Query;
use rand::Rng;
use fake::faker::company::en::Buzzword;
use fake::{Dummy, Fake, Faker};
use serde::{Serialize, Deserialize};

use crate::model::{product::Product, category::Category, cmp::{CmpPrice, CmpName}, filter::{Filter, Order, Param}};

use std::env;
use std::fs;
use std::io;

#[derive(Serialize)]
pub struct Res {
    products: Vec<Product>,
    #[serde(rename(serialize = "numOfResults"))]
    num_of_results: u16,
}

pub trait Database {
    fn get_product(&self, prod_id: u32) -> Option<&Product>;
    fn get_filtered_products(&self, filter: Query<Filter>) -> Res;
    fn get_products_from_list(&self, id_list: Vec<u16>) -> Vec<Product>;
    fn get_all_categories(&self) -> &Vec<Category>;
}

pub struct DatabaseMySql {}

impl DatabaseMySql {}


#[derive(Clone)]
pub struct DatabaseMock {
    pub categories: Vec<Category>,
    pub products: Vec<Product>,
}

impl DatabaseMock {
    pub fn new(num_of_cat: u8, num_of_prod: u16) -> DatabaseMock {
        let mut rng = rand::thread_rng();

        let cats = (0..num_of_cat).map(|x| Category { id: x, name: Buzzword().fake() }).collect();
        let prod = (0..num_of_prod)
            .map(|x|
                Product::new_dummy(x, rng.gen_range(0, num_of_cat)))
            .collect();

        DatabaseMock {
            categories: cats,
            products: prod,
        }
    }

    pub fn new_from_file(products_path: &str, categories_path: &str) -> Result<DatabaseMock, io::Error> {
        let s_product_data = fs::read_to_string(products_path)?;
        let v_product: Vec<Product> = serde_json::from_str(s_product_data.as_str())?;

        let s_category_data = fs::read_to_string(categories_path)?;
        let v_category: Vec<Category> = serde_json::from_str(s_category_data.as_str())?;

        Ok(DatabaseMock {
            categories: v_category,
            products: v_product,
        })
    }
}

impl Database for DatabaseMock {
    fn get_product(&self, prod_id: u32) -> Option<&Product> {
        self.products.get(prod_id as usize)
    }

    fn get_filtered_products(&self, filter: Query<Filter>) -> Res {
        let cmp_fun = match filter.sort {
            Param::NAME => <Product as CmpName>::cmp,
            Param::PRICE => <Product as CmpPrice>::cmp,
        };

        let mut _category = self.products.clone()
            .into_iter()
            .filter(|prod| prod.category == filter.cat)
            .collect::<Vec<Product>>();

        _category.sort_by(|a, b| match filter.order {
            Order::ASC => cmp_fun(a, b),
            Order::DESC => cmp_fun(b, a)
        });

        let _products_len = _category.len();

        Res {
            products: _category
                .into_iter()
                .skip(filter.offset as usize)
                .take(filter.limit as usize)
                .collect::<Vec<Product>>(),
            num_of_results: _products_len as u16,
        }
    }

    fn get_products_from_list(&self, id_list: Vec<u16>) -> Vec<Product> {
        self.products.clone().into_iter().filter(|prod| id_list.iter().any(|&i| i == prod.id)).collect::<Vec<Product>>()
    }

    fn get_all_categories(&self) -> &Vec<Category> {
        &self.categories
    }
}
