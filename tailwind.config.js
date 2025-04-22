/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
                mori: ['var(--font-mori)'],
                neue: ['var(--font-neue)'],
                cursive: ['var(--font-cursive)'],
                spartan: ['var(--font-spartan)'],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100ch', // add required value here
                    }
                }
            },
            keyframes: {
                'spin-smooth': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: {
                'spin-smooth': 'spin-smooth 11s linear infinite', // Smooth, slow spin
            },
        },
    },
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
    ],
};
