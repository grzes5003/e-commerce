mod model;
mod api;
mod auth;

extern crate pretty_env_logger;
#[macro_use]
extern crate log;

use std::io::Read;
use std::env;

use actix_files::Files;
use actix_web::{middleware, web, App, HttpResponse, HttpServer, Responder};
use actix_session::{Session, CookieSession};
use std::iter::Product;

use model::{product::Product as Prod, database::{DatabaseMock, DatabaseMySql}};
use crate::model::cmp::{CmpName, CmpPrice};
use crate::api::cart_handlers::{add_to_cart, get_all_orders, order_from_cart};
use crate::api::item_handlers::{get_all_categories, get_product, get_filtered_products, get_products_from_list};
use crate::api::user_handlers::{login, logout};
use crate::model::database::Database;
use std::borrow::Borrow;

async fn index() -> impl Responder {
    match std::fs::File::open("../frontend/build/index.html") {
        Ok(mut file) => {
            let mut contents = String::new();
            file.read_to_string(&mut contents).unwrap_or_default();

            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
                .header("pragma", "no-cache")
                .header("x-ua-compatible", "IE=edge, Chrome=1")
                .body(contents)
        }
        Err(e) => {
            warn!("index.html is not found - {}", e);

            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
                .header("pragma", "no-cache")
                .header("x-ua-compatible", "IE=edge, Chrome=1")
                .body("Resource not found")
        }
    }
}

async fn echo() -> impl Responder {
    "It works"
}

fn generate_db(b: bool) -> Box<dyn Database> {
    match b {
        false => Box::new(DatabaseMySql::try_new(env::var("DB_URL").unwrap_or_else(
            |e| {
                error!("When getting DB url: {}", e);
                String::from("")
            })).unwrap_or_else(
            |e| {
                error!("When connecting to DB: {}", e);
                DatabaseMySql::try_new(String::from("")).unwrap()
            }
        )),
        true => Box::new(DatabaseMock::new_from_file("resources/products.json", "resources/categories.json").unwrap_or_else(
            |e| {
                error!("When creating fake DB: {}", e);
                DatabaseMock::new(4, 200)
            }
        ))
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    pretty_env_logger::init();

    let mut settings = config::Config::default();
    settings
        .merge(config::File::with_name("config")).unwrap();

    // TODO
    //  tmp solution
    //  because of actix limitations trait type of Database is not arbitrary

    let db = DatabaseMySql::try_new(env::var("DB_URL").unwrap_or_else(
            |e| {
                error!("When getting DB url: {}", e);
                String::from("")
            })).unwrap_or_else(
        |e| {
            error!("When connecting to DB: {}", e);
            DatabaseMySql::try_new(String::from("")).unwrap()
        }
    );

    // let db = generate_db(settings.get_bool("mock").unwrap_or(false));

    HttpServer::new(move || {
        App::new()
            .data::<Box<dyn Database>>(Box::new(db.clone()))
            .wrap(middleware::Logger::default())
            .wrap(
                CookieSession::signed(&[0; 32])
                    .secure(false)
            )
            .service(Files::new("/static", "../frontend/build/static"))
            .service(
                web::scope("/api")
                    // ...so this handles requests for `GET /app/index.html`
                    .route("/echo", web::get().to(echo))
                    .service(get_product)
                    .service(get_all_categories)
                    .service(get_filtered_products)
                    .service(get_products_from_list)
                    .service(get_all_orders)
                    .service(order_from_cart),
            )
            .service(
                web::scope("/auth")
                    .service(login)
                    .service(logout)
            )
            .default_service(
                web::resource("/")
                    .route(web::get().to(index)),
            )
    })
        .bind("localhost:4040")?
        .run()
        .await
}
