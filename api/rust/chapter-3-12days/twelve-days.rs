use serde_json::json;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {

    let song = String::from(days_of_christmas());

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({"song": song}).to_string()
            .into(),
        )?)
}

fn days_of_christmas() -> String {
    const CHORUS: &str = "day of Christmas, my true love gave to me";

    const DAY_ONE: &str = "partridge in a pear tree.";
    const DAY_TWO: &str = "Two turtle doves,";
    const DAY_THREE: &str = "Three Fench hens,";
    const DAY_FOUR: &str = "Four calling birds,";
    const DAY_FIVE: &str = "Five folden rings,";
    const DAY_SIX: &str = "Six geese a-laying,";
    const DAY_SEVEN: &str = "Seven swans a-swimming,";
    const DAY_EIGHT: &str = "Eight maids a-milking,";
    const DAY_NINE: &str = "Nine ladies dancing,";
    const DAY_TEN: &str = "Ten lords a-leaping,";
    const DAY_ELEVEN: &str = "Eleven pipers piping,";
    const DAY_TWELVE: &str = "Twelve drummers drumming,";
    
    let day: [&str; 12] = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];
    let lyrics: [&str; 12] = [DAY_ONE, DAY_TWO, DAY_THREE, DAY_FOUR, DAY_FIVE, DAY_SIX, DAY_SEVEN, DAY_EIGHT, DAY_NINE, DAY_TEN, DAY_ELEVEN, DAY_TWELVE];
   
    let mut song = String::new();
    for lyric in lyrics {

        let index = lyrics.iter().position(|&x| x == lyric).unwrap();

        //add chorus
        song = format!("{}\nOn the {} {}", song, day[index], CHORUS);

        //Adding Verse
        let mut c_loop = index; 
        loop {
            //add and if the its not the last on
            if c_loop != 0 {
                song = format!("{}\n{}", song, lyrics[c_loop]);
            } else if index == 0{
                song = format!("{}\nA {}", song, lyrics[c_loop]);
                
            } else {
                song = format!("{}\nand a {}", song, lyrics[c_loop]);
            }
            
            //usize cannot be negative an
            if c_loop != 0 {
                c_loop -= 1;
            } else {
                break;
            }
        }


    }
    
    song
}
