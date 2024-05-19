export async function getTwelveDays() {
    let url = `/api/rust/chapter-3-12days/twelve-days`;

    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    const rsp = await response.json();
    return rsp; // parses JSON response into native JavaScript objects
};

