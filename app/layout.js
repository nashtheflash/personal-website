import { NavBar } from "@/app/components/general"
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

import { inter, mori, neue, cursive, spartan } from "../lib/fonts";
import "./globals.css";

export const metadata = {
    title: "Wired Woodsman",
    description: "A Blog about travel, tools, Alaska, the outdoors, and tech",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${mori.variable} ${neue.variable} ${cursive.variable} ${spartan.variable}`} data-theme="dark">
            <body className='min-h-screen bg-base-100'>
                <NavBar/>
                {children}
                <SpeedInsights />
                <Analytics/>
            </body>
        </html>
    );
}
