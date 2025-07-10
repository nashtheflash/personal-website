import { NavBar } from "@/app/components/general"

// Vercel
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

//Firebase
import { GoogleAnalytics } from '@next/third-parties/google'

//Auth
import { AuthProvider } from "@/lib/firebase"

//Fonts
import { inter, mori, neue, cursive, spartan } from "../lib/fonts";

import "./globals.css";

//Service Worker
import { ServiceWorkerRegister } from "./components/sw-register";

export default async function RootLayout({ children }) {

    return (
        <html lang="en" className={`${inter.variable} ${mori.variable} ${neue.variable} ${cursive.variable} ${spartan.variable}`} data-theme="dark">
            <body className='min-h-screen bg-base-100'>
                <AuthProvider>
                    <NavBar/>
                    {children}
                </AuthProvider>
                <ServiceWorkerRegister />
                <SpeedInsights />
                <Analytics/>
                <GoogleAnalytics gaId={process.env.MEASUREMENT_ID} />
            </body>
        </html>
    );
}
