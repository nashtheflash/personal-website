import { 
    Inter, 
    M_PLUS_2 as Mori, 
    Bebas_Neue as Neue,
    Cedarville_Cursive as Cursive,
    League_Spartan as Spartan,
    Chewy,
} from "next/font/google";


export const mori = Mori({
		subsets: ["latin"],
		display: 'swap',	
		variable: '--font-mori',
})

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

export const cursive = Cursive({
		subsets: ["latin"],	
        weight: '400',
		display: 'swap',	
		variable: '--font-cursive',
})

export const spartan = Spartan({
		subsets: ["latin"],	
        weight: ['400', '700'],
		display: 'swap',	
		variable: '--font-spartan',
})

export const chewy = Chewy({
		subsets: ["latin"],
        weight: ['400'],
		display: 'swap',	
		variable: '--font-chewy',
})
