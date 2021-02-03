use actix_web::{web, Responder, post, get, HttpResponse};
use actix_session::{Session};
use crate::model::{product::Product, category::Category, database::Database};
use serde::{Serialize, Deserialize};
use std::borrow::Borrow;
use argon2::{self, Config};
use regex::Regex;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LoginData {
    pub username: String,
    pub password: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RegisterData {
    pub nickname: String,
    pub surname: String,
    pub email: String,
    pub passwd: String
}

#[derive(Serialize, Debug)]
pub struct UserData {
    pub id: u16,
    #[serde(rename(serialize = "username"))]
    pub nickname: String,
    #[serde(rename(serialize = "firstName"))]
    pub name: String,
    #[serde(rename(serialize = "lastName"))]
    pub surname: String,
    pub email: String
}

impl From<(u16, String, String, String, String)> for UserData {
    fn from(tuple: (u16, String, String, String, String)) -> Self {
        UserData {
            id: tuple.0,
            nickname: tuple.1,
            name: tuple.2,
            surname: tuple.3,
            email: tuple.4
        }
    }
}

#[post("/login")]
pub async fn login<'a>(db: web::Data<Box<dyn Database>>, session: Session, login_data_raw: web::Json<LoginData>) -> impl Responder {
    info!("login data {:?}", login_data_raw);

    let login_data = LoginData {
        username: String::from(&login_data_raw.username),
        password: String::from(&login_data_raw.password)
    };

    if let Some(user_data) = db.login(login_data) {
        session.set("user_id", &user_data.id);
        return HttpResponse::Ok()
            .json(UserData {
                id: user_data.id,
                nickname: user_data.nickname,
                name: user_data.name,
                surname: user_data.surname,
                email: user_data.email
            })
    }

    HttpResponse::Forbidden()
        .body("Bad login or password")
}

#[post("/register")]
pub async fn register<'a>(db: web::Data<Box<dyn Database>>, session: Session, register_data_raw: web::Json<RegisterData>) -> impl Responder {

    let register_data = RegisterData {
        nickname: String::from(&register_data_raw.nickname),
        surname: String::from(&register_data_raw.surname),
        email: String::from(&register_data_raw.email),
        passwd: String::from(&register_data_raw.passwd)
    };

    info!("register data {:?}", register_data);

    if let Ok(_) = db.register(register_data) {
        return HttpResponse::Ok();
    }

    HttpResponse::Forbidden()
}

#[get("/logout")]
pub async fn logout(db: web::Data<Box<dyn Database>>, session: Session) -> impl Responder {
    info!("logout action");

    if let Ok(Some(user_id)) = session.get::<u64>("user_id") {
        session.purge();
        return HttpResponse::Ok()
    }

    HttpResponse::Forbidden()
}
