use actix_web::{web, Responder, get, HttpResponse};
use crate::model::{product::Product, category::Category, database::Database, cmp::{CmpPrice, CmpName}, filter::{Filter,Order,Param}};
use actix_web::web::Query;
use crate::model::deserializer::deserialize_stringified_list;
use serde::{Serialize, Deserialize};

#[derive(Deserialize, Debug)]
pub struct IdList {
    #[serde(deserialize_with = "deserialize_stringified_list")]
    pub id: Vec<String>
}

#[get("/product/{prod_id}")]
pub async fn get_product(db: web::Data<Box<dyn Database>>, web::Path(prod_id): web::Path<u32>) -> impl Responder {
    match db.get_product(prod_id) {
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
pub async fn get_filtered_products(db: web::Data<Box<dyn Database>>, filter: Query<Filter>) -> impl Responder {
    info!("Filter: {:?}", filter);
    HttpResponse::Ok()
        .content_type("application/json")
        .json(db.get_filtered_products(filter))
}

#[get("/products/filtered")]
pub async fn get_products_from_list(db: web::Data<Box<dyn Database>>, id_list: Query<IdList>) -> impl Responder {
    info!("List: {:?}", id_list);

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
                    db.get_products_from_list(val)
                )
        }
        Err(e) => {
            HttpResponse::BadRequest()
                .body("Could not parse request")
        }
    }
}

#[get("/categories")]
pub async fn get_all_categories(db: web::Data<Box<dyn Database>>) -> impl Responder {
    info!("request in get all cat");
    HttpResponse::Ok()
        .content_type("application/json")
        .json(db.get_all_categories())
}
