export async function getGuessingGame(currentNumber, currentGuess) {
    let url = `/api/rust/chapter-2/guessing-game?currentNumber=${currentNumber}&currentGuess=${currentGuess == '' ? 0 : currentGuess}`;

    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(currentNumber), // body data type must match "Content-Type" header
    });
    
    const rsp = await response.json();
    return rsp; // parses JSON response into native JavaScript objects
};
