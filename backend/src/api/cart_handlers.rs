use actix_web::{web, Responder, get, HttpResponse};
use crate::model::{product::Product, category::Category, database::Database};

#[get("/add/to/cart/{prod_id}")]
pub async fn add_to_cart(db: web::Data<dyn Database>, web::Path(prod_id): web::Path<u32>) -> impl Responder {
    unimplemented!();
    HttpResponse::Ok()
}
