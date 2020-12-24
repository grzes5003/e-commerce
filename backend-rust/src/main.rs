use std::io::Read;

use actix_files::Files;
use actix_web::{middleware, web, App, HttpResponse, HttpServer, Responder};



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
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(Files::new("/static", "../frontend/build/static"))
            .service(
                web::scope("/api")
                         // ...so this handles requests for `GET /app/index.html`
                         .route("/echo", web::get().to(echo)),)
            .default_service(
                web::resource("/")
                    .route(web::get().to(index)),
            )
    })
        .bind("192.168.178.86:4040")?
        .run()
        .await
}
