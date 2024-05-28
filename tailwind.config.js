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
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100ch', // add required value here
                    }
                }
            }
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
