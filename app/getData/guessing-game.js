export async function getGuessingGame(currentNumber, currentGuess) {
    let url = `/api/rust/chapter-2/guessing-game?currentNumber=${currentNumber}&currentGuess=${currentGuess == '' ? 0 : currentGuess}`;

    const response = await fetch(url, {
        method: "POST", // *get, post, put, delete, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(currentNumber), // body data type must match "content-type" header
    });
    
    const rsp = await response.json();
    return rsp; // parses json response into native javascript objects
};
