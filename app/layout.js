import { NavBar } from "@/components/general"

// Vercel
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

//Firebase
import { GoogleAnalytics } from '@next/third-parties/google'

//Auth
import { AuthProvider } from "@/lib/firebase"

//Fonts
import { inter, mori, neue, cursive, spartan, chewy, didot } from "@/lib/fonts";

//Defualt Styles
import { AddBackground } from "@/components/styles";

import "./globals.css";

export default async function RootLayout({ children }) {

    return (
        <html lang="en" className={`${inter.variable} ${mori.variable} ${neue.variable} ${cursive.variable} ${spartan.variable} ${chewy.variable} ${didot.variable}`} data-theme="retro">
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
                    <GoogleAnalytics gaId={process.env.MEASUREMENT_ID} />
                </AddBackground>
            </body>
        </html>
    );
}
