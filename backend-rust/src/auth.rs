use actix_cors::Cors;
use actix_web::{dev::ServiceRequest, get, App, Error, HttpResponse, HttpServer};
use actix_web_httpauth::{
    extractors::bearer::BearerAuth, middleware::HttpAuthentication,
};

async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, Error> {
    eprintln!("{:?}", credentials);
    Ok(req)
}
