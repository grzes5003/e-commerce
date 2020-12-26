use actix_web::{web, Responder, get, HttpResponse};
use crate::model::{Product, Database, CmpName, CmpPrice};

#[get("/add/to/cart/{prod_id}")]
pub async fn add_to_cart(db: web::Data<Database>, web::Path(prod_id): web::Path<u32>) -> impl Responder {
    unimplemented!();
    HttpResponse::Ok()
}
