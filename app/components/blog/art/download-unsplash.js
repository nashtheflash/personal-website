"use client"; // Ensure it's a client-side component

import { useState } from "react";

export function UnsplashDownloader({ imageId, title }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);

        try {
            const clientId = "708935"; // Replace with your Unsplash API key
            const apiUrl = `https://api.unsplash.com/photos/${imageId}/download?client_id=${clientId}`;

            // Fetch the Unsplash download URL
            const response = await fetch(apiUrl);
            const data = await response.json();
            const imageUrl = data.url; // The direct image download URL

            // Fetch the image file
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();
            const imageObjectUrl = URL.createObjectURL(imageBlob);

            // Create an invisible link and trigger download
            const link = document.createElement("a");
            link.href = imageObjectUrl;
            link.download = `${title}.jpg`; // Set filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke object URL after download
            URL.revokeObjectURL(imageObjectUrl);
        } catch (error) {
            console.error("Error downloading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                handleDownload();
            }}
            className="uppercase text-lg font-semibold text-gray-200 hover:underline mt-5"
        >
            {loading ? "Downloading..." : "Download"}
        </a>

    );
};
