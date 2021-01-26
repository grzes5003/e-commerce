use actix_web::{web, Responder, post, HttpResponse};
use crate::model::{product::Product, category::Category, database::Database};
use serde::{Serialize, Deserialize};
use std::borrow::Borrow;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct LoginData {
    username: String,
    password: String
}

#[derive(Serialize, Debug)]
struct UserData {
    id: u16,
    username: String,
    // TODO why not _case
    firstName: String,
    lastName: String,
    token: String
}

#[post("/login")]
pub async fn login<'a>(db: web::Data<Box<dyn Database>>, login_data: web::Json<LoginData>) -> impl Responder {
    info!("login data {:?}", login_data);

    if login_data.username == "test".to_string() && login_data.password == "test".to_string() {
        return HttpResponse::Ok()
            .json(UserData {
                id: 1,
                username: String::from(&login_data.username),
                firstName: String::from(&login_data.username),
                lastName: String::from(&login_data.username),
                token: "fake-jwt-token".to_string()
            })
    }

    HttpResponse::Forbidden()
        .body("Bad login or password")
}
