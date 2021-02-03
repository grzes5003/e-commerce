use actix_web::{web, Responder, get, HttpResponse};
use actix_session::Session;
use crate::model::{product::Product, category::Category, database::Database};
use crate::api::item_handlers::IdList;

#[get("/add/to/cart/{prod_id}")]
pub async fn add_to_cart(db: web::Data<Box<dyn Database>>, web::Path(prod_id): web::Path<u32>) -> impl Responder {
    unimplemented!();
    HttpResponse::Ok()
}

#[get("/order/list")]
pub async fn order_from_cart(db: web::Data<Box<dyn Database>>, session: Session, id_list: web::Query<IdList>) -> impl Responder {

    if let Ok(Some(user_id)) = session.get::<u64>("user_id") {
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
                        db.order_from_cart(val, user_id)
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

#[get("/orders/all")]
pub async fn get_all_orders(db: web::Data<Box<dyn Database>>, session: Session) -> impl Responder {

    if let Ok(Some(user_id)) = session.get::<u64>("user_id") {
        return HttpResponse::Ok()
            .content_type("application/json")
            .json(
                db.get_all_orders(user_id)
            )
    }

    HttpResponse::Unauthorized().body("You must login first")
}
