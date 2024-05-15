export async function getRustMascot(mascot) {
    let url;

    if (mascot == "CLIPPY") {
        url = '/api/crab?CLIPPY'
    } else {
        url = '/api/crab?FERRIS'
    }

    const response = await fetch(`${url}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mascot), // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
};
