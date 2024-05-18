export async function getFibonacciNumber(position) {
    let url = `/api/rust/chapter-3-fib/fib?position=${position}`;

    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(position), // body data type must match "Content-Type" header
    });
    
    const rsp = await response.json();
    return rsp; // parses JSON response into native JavaScript objects
};
