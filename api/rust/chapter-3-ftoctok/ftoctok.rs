use url::Url;
use serde_json::json;
use std::collections::HashMap;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {

    let parsed_url = Url::parse(&_req.uri().to_string()).unwrap();
    let query_params = parsed_url
        .query_pairs()
        .into_owned()
        .collect::<HashMap<String, String>>();

    let from = query_params.get("from").expect("Current number not provided");
    let to = query_params.get("to").expect("Current number not provided");
    let temp = query_params.get("temp").expect("Current number not provided");

    let from = String::from(from);
    let to = String::from(to);
    let temp = temp.parse::<i8>().unwrap();

    let result = convert_temp(&from, &to, temp);

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({"tempreture": result}).to_string()
            .into(),
        )?)
}

fn convert_temp(from: &str, to: &str, tmp: i8,) -> f64 {

    let c: f64 = if from == "fahrenheit" && to == "celsius" {
        f_to_c(tmp)
    } else if from == "fahrenheit" && to == "kelvin" {
        f_to_k(tmp)
    } else if from == "celsius" && to == "fahrenheit" {
        c_to_f(tmp)
    } else if from == "celsius" && to == "kelvin" {
        c_to_k(tmp)
    } else if from == "kelvin" && to == "celsius" {
        k_to_c(tmp)
    } else if from == "kelvin" && to == "fahrenheit" {
        k_to_f(tmp)
    } else {
        0.
    };

    c
}

//CELSIUS
fn c_to_f(tmp: i8) -> f64 {
    // (C × 9/5) + 32 = °F    
    let tmp: f64 = tmp.into();
    let celsius: f64 = (tmp * 9.0/5.0) + 32.0;
    celsius

}

fn c_to_k(tmp: i8) -> f64{
    //(F − 32) × 5/9 + 273.15 = K    
    let tmp: f64 = tmp.into();
    let kelvin: f64 = tmp + 273.15;
    kelvin
}

//FEHRENHEIT
fn f_to_c(tmp: i8) -> f64{
    // (F − 32) × 5/9 = C
    let tmp: f64 = tmp.into();
    let celsius: f64 = (tmp - 32.0) * 5.0/9.0;
    celsius
}

fn f_to_k(tmp: i8) -> f64{
    //(F − 32) × 5/9 + 273.15 = K    
    let tmp: f64 = tmp.into();
    let kelvin: f64 = (tmp - 32.0) * 5.0/9.0 + 273.15;
    kelvin
}

//KELVIN
fn k_to_c(tmp: i8) -> f64{
    // (F − 32) × 5/9 = C
    let tmp: f64 = tmp.into();
    let celsius: f64 = tmp - 273.15;
    celsius
}

fn k_to_f(tmp: i8) -> f64{
    //(K − 273.15) × 9/5 + 32 = F
    let tmp: f64 = tmp.into();
    let kelvin: f64 = (tmp - 273.15) * 9.0/5.0 + 32.0;
    kelvin
}
