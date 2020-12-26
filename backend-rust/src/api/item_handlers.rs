use actix_web::{web, Responder, get, HttpResponse};
use crate::model::{Product, Database, CmpName, CmpPrice};
use actix_web::web::Query;
use crate::deserializer::deserialize_stringified_list;
use serde::{Serialize, Deserialize};

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
enum Order {
    ASC,
    DESC,
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
enum Param {
    NAME,
    PRICE,
}

#[derive(Deserialize, Debug)]
struct Filter {
    cat: u8,
    offset: u32,
    limit: u16,
    sort: Param,
    order: Order,
}

#[derive(Deserialize, Debug)]
struct IdList {
    #[serde(deserialize_with = "deserialize_stringified_list")]
    id: Vec<String>
}

#[get("/product/{prod_id}")]
pub async fn get_product(db: web::Data<Database>, web::Path(prod_id): web::Path<u32>) -> impl Responder {
    match db.products.get(prod_id as usize) {
        Some(val) => {
            HttpResponse::Ok()
                .content_type("application/json")
                .json(val)
        }
        None => HttpResponse::NotFound()
            .body("Product not found")
    }
}

#[get("/products")]
pub async fn get_filtered_products(db: web::Data<Database>, filter: Query<Filter>) -> impl Responder {
    println!("Filter: {:?}", filter);

    let cmp_fun = match filter.sort {
        Param::NAME => <Product as CmpName>::cmp,
        Param::PRICE => <Product as CmpPrice>::cmp,
    };

    let mut _category = db.products.clone()
        .into_iter()
        .filter(|prod| prod.category == filter.cat)
        .collect::<Vec<Product>>();

    _category.sort_by(|a, b| match filter.order {
        Order::ASC => cmp_fun(a, b),
        Order::DESC => cmp_fun(b, a)
    });

    let _products_len = _category.len();

    #[derive(Serialize)]
    struct Result {
        products: Vec<Product>,
        numOfResults: u16,
    }

    HttpResponse::Ok()
        .content_type("application/json")
        .json(Result {
            products: _category
                .into_iter()
                .skip(filter.offset as usize)
                .take(filter.limit as usize)
                .collect::<Vec<Product>>(),
            numOfResults: _products_len as u16,
        })
}

#[get("/products/filtered")]
pub async fn get_products_from_list(db: web::Data<Database>, id_list: Query<IdList>) -> impl Responder {
    println!("List: {:?}", id_list);

    let ids: Result<Vec<_>, _> = id_list.id
        .to_owned()
        .into_iter()
        .map(|id| id.parse::<u16>())
        .collect();

    match ids {
        Ok(val) => {
            HttpResponse::Ok()
                .content_type("application/json")
                .json(
                    db.products.clone().into_iter().filter(|prod| val.iter().any(|&i| i == prod.id)).collect::<Vec<Product>>()
                )
        }
        Err(e) => {
            HttpResponse::BadRequest()
                .body("Could not parse request")
        }
    }
}

#[get("/categories")]
pub async fn get_all_categories(db: web::Data<Database>) -> impl Responder {
    HttpResponse::Ok()
        .content_type("application/json")
        .json(&db.categories)
}
