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

    let fib_position = query_params.get("position").expect("Current number not provided");

    let fib_position = fib_position.parse::<i32>().unwrap();

    let fib_number: i128 = fib(fib_position);

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({"fib": fib_number.to_string()}).to_string()
            .into(),
        )?)
}

fn fib(n: i32) -> i128{
    if n == 0 {
        return 0;
    } else {
        let mut s_num = 0;
        let mut e_num = 1;
        let mut c_num;
        let mut l_num = 2;

        let fib_number: i128 = loop {
            l_num += 1;
            c_num = s_num + e_num;
            s_num = e_num;
            e_num = c_num;
            
            if l_num > n {
                break e_num;
            }
            
        };

        return fib_number;
    }
}
