mod model;
mod api;
mod deserializer;

use std::io::Read;

use actix_files::Files;
use actix_web::{middleware, web, App, HttpResponse, HttpServer, Responder};
use std::iter::Product;

use model::{Product as Prod, Database};
use crate::model::{CmpName, CmpPrice};
use crate::api::{get_product, get_all_categories, get_filtered_products, get_products_from_list};

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
            println!("index.html is not found - {}", e);

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
    "Hello world!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = Database::new(4,200);

    HttpServer::new(move || {
        App::new()
            .data(db.clone())
            .wrap(middleware::Logger::default())
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
            .default_service(
                web::resource("/")
                    .route(web::get().to(index)),
            )
    })
        .bind("192.168.178.86:4040")?
        .run()
        .await
}

// fn main() {
//     let prod1: Prod = Prod::new(1,"name3".to_string(), 1.1, "desc1".to_string(), 1);
//     let prod2: Prod = Prod::new(2,"name2".to_string(), 1.2, "desc2".to_string(), 2);
//
//     // println!("compare: {:?}", prod1.cmp(&prod2));
//     println!("compare: {:?}", <Prod as CmpName>::cmp(&prod1, &prod2));
//     println!("compare: {:?}", <Prod as CmpPrice>::cmp(&prod1, &prod2));
//
//     let db = Database::new(4,10);
//
//     println!("element: {:?}", db.products);
// }
