use rand::Rng;
use std::collections::HashMap;

//This is for the server
use url::Url;
use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let mut current_number_rsp: i8 = 0;
    let mut prompt_rsp = String::new();

    let parsed_url = Url::parse(&_req.uri().to_string()).unwrap();
    let query_params = parsed_url
        .query_pairs()
        .into_owned()
        .collect::<HashMap<String, String>>();

    let current_number = query_params.get("currentNumber").expect("Current number not provided");
    let current_guess = query_params.get("currentGuess").expect("Guess not provided");

    let current_number = current_number.parse::<i8>().unwrap();
    let current_guess = current_guess.parse::<i8>().unwrap();

    if current_guess == 0 {
        current_number_rsp = current_number;
        prompt_rsp = String::from("Input a number before submitting!")
    }

    if current_number == -1 {
        current_number_rsp = rand::thread_rng().gen_range(1..=100);
        prompt_rsp = String::from("Number selected. Guess a number!")

    }
    
    if current_number > current_guess && current_number != -1 && current_guess != 0 {
        current_number_rsp = current_number;
        prompt_rsp = String::from("Too small! Guess again!")
    }

    if current_number == current_guess {
        current_number_rsp = -1;
        prompt_rsp = String::from("You Win! Press button to restart.")
    }
    
    if current_number < current_guess && current_number != -1 {
        current_number_rsp = current_number;
        prompt_rsp = String::from("Too big! Guess Again!")
    }

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({"currentNumber": current_number_rsp, "prompt": prompt_rsp}).to_string()
            .into(),
        )?)
}
