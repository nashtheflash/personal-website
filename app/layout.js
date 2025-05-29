import { NavBar } from "@/app/components/general"

// Vercel
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

//Firebase Analytics
import { GoogleAnalytics } from '@next/third-parties/google'

import { inter, mori, neue, cursive, spartan } from "../lib/fonts";

import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${mori.variable} ${neue.variable} ${cursive.variable} ${spartan.variable}`} data-theme="dark">
            <body className='min-h-screen bg-base-100'>
                <NavBar/>
                {children}
                <SpeedInsights />
                <Analytics/>
                <GoogleAnalytics gaId={process.env.MEASUREMENT_ID} />
            </body>
        </html>
    );
}
