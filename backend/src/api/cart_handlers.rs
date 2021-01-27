use actix_web::{web, Responder, get, HttpResponse};
use actix_session::Session;
use crate::model::{product::Product, category::Category, database::Database};

#[get("/add/to/cart/{prod_id}")]
pub async fn add_to_cart(db: web::Data<Box<dyn Database>>, web::Path(prod_id): web::Path<u32>) -> impl Responder {
    unimplemented!();
    HttpResponse::Ok()
}

#[get("/order/list")]
pub async fn order_from_cart(db: web::Data<Box<dyn Database>>, session: Session, id_list: web::Query<IdList>) -> impl Responder {

    if let Some(user_id) = session.get::<u64>("user_id")? {
        let ids: Result<Vec<_>, _> = id_list.id
            .to_owned()
            .into_iter()
            .map(|id| id.parse::<u16>())
            .collect();

        return match ids {
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

    HttpResponse::Unauthorized().body("You must login first")
}
