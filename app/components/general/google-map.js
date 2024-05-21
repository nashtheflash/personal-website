'use client';

export function GoogleMap({ url, height, width }) {
    return(
        <iframe 
            src={url} 
            width="100%" 
            height="100%" 
            style={{"border": 0 }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    )
}
