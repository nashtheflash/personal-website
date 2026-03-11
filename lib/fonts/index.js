{/*
This is the new fonts locaiton. Need to delete /compnents/fonts.js

to add a new font
    * add font below
    * add font to tailwind.config
    * add font to root layout

*/}

import {
    Inter,
    Bebas_Neue as Neue,
    League_Spartan as Spartan,
    GFS_Didot as Didot,
} from "next/font/google";


export const neue = Neue({
		subsets: ["latin"],
        weight: '400',
		display: 'swap',	
		variable: '--font-neue',
})

export const inter = Inter({
		subsets: ["latin"],	
		display: 'swap',	
		variable: '--font-inter',
})

export const spartan = Spartan({
		subsets: ["latin"],	
        weight: ['400', '700'],
		display: 'swap',	
		variable: '--font-spartan',
})

export const didot = Didot({
		subsets: ["greek"],
        weight: ['400'],
		display: 'swap',	
		variable: '--font-didot',
})

