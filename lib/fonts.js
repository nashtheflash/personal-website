import { Inter, M_PLUS_2 as Mori, Bebas_Neue as Neue } from "next/font/google";


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

