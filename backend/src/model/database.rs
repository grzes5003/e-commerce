use actix_web::web::Query;
use rand::Rng;
use fake::faker::company::en::Buzzword;
use fake::{Dummy, Fake, Faker};
use serde::{Serialize, Deserialize};
use mysql::{Pool, Error, params, Row, from_row, from_value, Value};

use crate::model::{product::Product, category::Category, cmp::{CmpPrice, CmpName}, filter::{Filter, Order, Param}};

use std::env;
use std::fs;
use std::io;
use mysql::prelude::{Queryable, FromValue, FromRow};

#[derive(Serialize)]
pub struct Res {
    products: Vec<Product>,
    #[serde(rename(serialize = "numOfResults"))]
    num_of_results: u16,
}

pub trait Database {
    fn get_product(&self, prod_id: u32) -> Option<Product>;
    fn get_filtered_products(&self, filter: Query<Filter>) -> Res;
    fn get_products_from_list(&self, id_list: Vec<u16>) -> Vec<Product>;
    fn get_all_categories(&self) -> Vec<Category>;

    fn order_from_cart(&self, _items: Vec<String>, _user_id: String) -> Result<(), ()>;
}

#[derive(Clone)]
pub struct DatabaseMySql {
    pool: Pool
}

impl DatabaseMySql {
    pub fn try_new(url: String) -> Result<DatabaseMySql, mysql::Error> {
        let pool = Pool::new(url)?;
        Ok(DatabaseMySql {
            pool
        })
    }
}

impl Database for DatabaseMySql {
    fn get_product(&self, prod_id: u32) -> Option<Product> {
        let mut conn = self.pool.get_conn();

        if let Err(e) = conn {
            warn!("Cannot get connection to db, {}", e);
            return None;
        }

        let mut conn_ = conn.unwrap();
        if let Ok(stmt) = conn_.prep(
            "SELECT ps.id, ps.name, price, category, b.name as brand, description, picture, units_in_stock FROM products ps
                    JOIN brands b on ps.brand = b.id
                    WHERE ps.id=:prod_id;"
        ) {
            let result: Option<(u16, String, f32, u8, String, String, String, u32)> = conn_.exec_first(&stmt, params! {"prod_id" => prod_id}).unwrap_or(None);
            return match result {
                Some(val) => Some(Product::from(val)),
                None => None
            };
        }
        None
    }

    fn get_filtered_products(&self, filter: Query<Filter>) -> Res {
        let mut conn = self.pool.get_conn();

        if let Err(e) = conn {
            warn!("Cannot get connection to db, {}", e);
            return Res { products: vec![], num_of_results: 0 };
        }

        let mut conn_ = conn.unwrap();
        if let Ok(stmt) = conn_.prep(
            format!("SELECT ps.id,
                        ps.name,
                        price,
                        category,
                        b.name as brand,
                        description,
                        picture,
                        units_in_stock
                    FROM products ps
                    JOIN brands b on ps.brand = b.id
                    WHERE ps.category=:cat ORDER BY ps.{} {}
                    LIMIT :limit OFFSET :offset;", filter.sort, filter.order)
        ) {
            let result =
                conn_.exec_iter(&stmt, params! {
                        "cat" => filter.cat,
                        "offset" => filter.offset,
                        "limit" => filter.limit,
                        "sort" => match filter.sort {
                            Param::NAME => "ps.name",
                            Param::PRICE => "ps.price"
                        },
                    }).unwrap();
            let products =
                result.into_iter().map(|row| Product::from(from_row::<(u16, String, f32, u8, String, String, String, u32)>(row.unwrap()))).collect::<Vec<Product>>();

            let count_stmt = conn_.prep("SELECT COUNT(id) as num_of_results FROM products WHERE category=:cat;").unwrap();
            let prod_len = from_value::<u16>(conn_.exec_first(&count_stmt, params! {"cat" => filter.cat}).unwrap().unwrap_or(Value::from(0)));
            warn!("{:?}", products);
            return Res { products, num_of_results: prod_len };
        }
        warn!("Something went wrong when filtering");
        Res { products: vec![], num_of_results: 0 }
    }

    fn get_products_from_list(&self, id_list: Vec<u16>) -> Vec<Product> {
        unimplemented!();
    }

    fn get_all_categories(&self) -> Vec<Category> {
        let mut conn = self.pool.get_conn();

        if let Err(e) = conn {
            warn!("Cannot get connection to db, {}", e);
            return Vec::new();
        }

        let mut conn_ = conn.unwrap();
        let result = conn_.query_iter("SELECT id, name FROM categories;").unwrap();
        return result.into_iter().map(|row| Category::from(from_row::<(u8, String)>(row.unwrap()))).collect::<Vec<Category>>();
    }

    fn order_from_cart(&self, _items: Vec<String>, _user_id: u64) -> Result<(), ()> {
        let mut conn = self.pool.get_conn();

        if let Err(e) = conn {
            warn!("Cannot get connection to db, {}", e);
            return Err(());
        }

        let mut conn_ = conn.unwrap();
        let res = conn.exec_batch(
            r"INSERT INTO payment (id, customer, purchase_dtime)
                    VALUES (:id, :customer, now())",
            payments.iter().map(|p| params! {
                "customer_id" => p.customer_id,
                "amount" => p.amount,
                "account_name" => &p.account_name,
            }),
        )?;
    }
}


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
    fn get_product(&self, prod_id: u32) -> Option<Product> {
        match self.products.get(prod_id as usize) {
            Some(val) => Some(val.clone()),
            None => None
        }
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

    fn get_all_categories(&self) -> Vec<Category> {
        self.categories.clone()
    }

    fn order_from_cart(&self, _items: Vec<String>, _user_id: String) -> Result<(), ()> {
        unimplemented!();
        Err(())
    }
}
