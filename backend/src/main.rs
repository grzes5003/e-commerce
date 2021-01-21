mod model;
mod api;
mod auth;

extern crate pretty_env_logger;
#[macro_use]
extern crate log;

use std::io::Read;

use actix_files::Files;
use actix_web::{middleware, web, App, HttpResponse, HttpServer, Responder};
use actix_session::{Session, CookieSession};
use std::iter::Product;

use model::{product::Product as Prod, database::{DatabaseMock, DatabaseMySql}};
use crate::model::cmp::{CmpName, CmpPrice};
use crate::api::cart_handlers::add_to_cart;
use crate::api::item_handlers::{get_all_categories, get_product, get_filtered_products, get_products_from_list};
use crate::api::user_handlers::login;
use crate::model::database::Database;

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

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    pretty_env_logger::init();

    let mut settings = config::Config::default();
    settings
        .merge(config::File::with_name("config")).unwrap();

    // TODO
    //  tmp solution

    let db = match settings.get_bool("mock").unwrap_or(false) {
        _ => DatabaseMock::new_from_file("resources/products.json", "resources/categories.json").unwrap_or_else(
            |e| {
                error!("When creating fake DB: {}", e);
                DatabaseMock::new(4, 200)
            }
        )
    };

    HttpServer::new(move || {
        App::new()
            .data(Box::new(db.clone()))
            .wrap(middleware::Logger::default())
            .wrap(
                CookieSession::signed(&[0; 32]) // <- create cookie based session middleware
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
                    .service(get_products_from_list),
            )
            .service(
                web::scope("/auth")
                    .service(login)
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