import { NavBar } from "@/components/general"

// Vercel
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

//Auth
import { AuthProvider } from "@/lib/firebase"

//Fonts
import { inter, neue, spartan, didot } from "@/lib/fonts";

//Defualt Styles
import { AddBackground } from "@/components/styles";

import "./globals.css";

export default async function RootLayout({ children }) {

    return (
        <html lang="en" className={`${inter.variable} ${neue.variable} ${spartan.variable} ${didot.variable}`} data-theme="retro">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            </head>
            <body className='min-h-screen'>
                <AddBackground bgColor={'bg-base-200'}>
                    <AuthProvider>
                        <NavBar/>
                        {children}
                    </AuthProvider>
                    <SpeedInsights />
                    <Analytics/>
                </AddBackground>
            </body>
        </html>
    );
}
