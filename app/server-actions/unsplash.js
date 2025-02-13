"use server";

export async function fetchUnsplashImageById(imageId) {
    if (!imageId) return { error: "Image ID is required" };

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/${imageId}?client_id=${accessKey}`
        );

        if (!response.ok) {
            throw new Error(`Unsplash API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Return the full image object
    } catch (error) {
        return { error: error.message };
    }
}

export async function parseUnsplashText(text) {
    if(!text){
        return {
            title: 'Untitled',
            description: 'A picture is worth a thousnd words. This picture does not need a description!',
        };
    }
    

    const titleMatch = text.match(/^"(.+?)"/);
    const title = titleMatch ? titleMatch[1] : "";
    
    let description = text;
    if (titleMatch) {
        description = description.replace(titleMatch[0], "").replace(/^\s*[–—]\s*/, "").trim();
    }
    
    return {
        title,
        description
    };
}
