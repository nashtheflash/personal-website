use std::io::{stdout, BufWriter};
use smallvec::*;
use std::io::Write;
use textwrap::fill;
use unicode_width::UnicodeWidthStr;
use std::str;
use serde_json::json;
use url::Url;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};


#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let url = Url::parse(&_req.uri().to_string())?;
    let mascot = url.query();


    let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();

    let mut writer = BufWriter::new(stdout.lock());
    let wb = say(&message, mascot, width, &mut writer);

    let s = match str::from_utf8(&wb) {
        Ok(v) => v,
        Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
    };

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!(s).to_string()
            .into(),
        )?)
}


const ENDSL: &[u8] = b"| ";
const ENDSR: &[u8] = b" |\n";
#[cfg(not(feature = "clippy"))]
const FERRIS: &[u8] = br#"
        \
         \
            _~^~^~_
        \) /  o o  \ (/
          '_   -   _'
          / '-----' \
"#;

const CLIPPY: &[u8] = br#"
        \
         \
            __
           /  \
           |  |
           @  @
           |  |
           || |/
           || ||
           |\_/|
           \___/
"#;
const NEWLINE: u8 = b'\n';
const DASH: u8 = b'-';
const UNDERSCORE: u8 = b'_';
const SPACE: u8 = b' ';

// A decent number for SmallVec's Buffer Size, not too large
// but also big enough for most inputs
const BUFSIZE: usize = 2048;

pub fn say<W>(input: &str, mascot: Option<&str>, max_width: usize, _writer: W) -> smallvec::SmallVec<[u8; 2048]>

where
    W: Write,
{
    // Final output is stored here
    let mut write_buffer = SmallVec::<[u8; BUFSIZE]>::new();

    // Let textwrap work its magic
    let wrapped = fill(input, max_width);

    let lines: Vec<&str> = wrapped.lines().collect();

    let line_count = lines.len();
    let actual_width = longest_line(&lines);

    // top box border
    write_buffer.push(SPACE);
    for _ in 0..(actual_width + 2) {
        write_buffer.push(UNDERSCORE);
    }
    write_buffer.push(NEWLINE);

    // inner message
    for (i, line) in lines.into_iter().enumerate() {
        if line_count == 1 {
            write_buffer.extend_from_slice(b"< ");
        } else if i == 0 {
            write_buffer.extend_from_slice(b"/ ");
        } else if i == line_count - 1 {
            write_buffer.extend_from_slice(b"\\ ");
        } else {
            write_buffer.extend_from_slice(ENDSL);
        }

        let line_len = UnicodeWidthStr::width(line);
        write_buffer.extend_from_slice(line.as_bytes());
        for _ in line_len..actual_width {
            write_buffer.push(SPACE);
        }

        if line_count == 1 {
            write_buffer.extend_from_slice(b" >\n");
        } else if i == 0 {
            write_buffer.extend_from_slice(b" \\\n");
        } else if i == line_count - 1 {
            write_buffer.extend_from_slice(b" /\n");
        } else {
            write_buffer.extend_from_slice(ENDSR);
        }
    }

    // bottom box border
    write_buffer.push(SPACE);
    for _ in 0..(actual_width + 2) {
        write_buffer.push(DASH);
    }

    // mascot
    println!("{:?}", mascot);

    if  mascot == Some("CLIPPY") {
        write_buffer.extend_from_slice(CLIPPY);
    } else {
        write_buffer.extend_from_slice(FERRIS);
    }
    
    write_buffer

}

fn longest_line(lines: &[&str]) -> usize {
    lines
        .iter()
        .map(|line| UnicodeWidthStr::width(*line))
        .max()
        .unwrap_or(0)
}
