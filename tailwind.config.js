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
            colors: {
                'base-content': 'oklch(var(--color-base-content))',
                'primary-content': 'oklch(var(--color-primary-content))',
                'secondary-content': 'oklch(var(--color-secondary-content))',
                'accent-content': 'oklch(var(--color-accent-content))',
                'neutral-content': 'oklch(var(--color-neutral-content))',
                'info-content': 'oklch(var(--color-info-content))',
                'success-content': 'oklch(var(--color-success-content))',
                'warning-content': 'oklch(var(--color-warning-content))',
                'error-content': 'oklch(var(--color-error-content))',
            },
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
                chewy: ['var(--font-chewy)'],
                didot: ['var(--font-didot)'],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '90ch',
                        fontSize: '1rem',
                        lineHeight: '1.75',
                        '--tw-prose-body': 'oklch(var(--color-base-content))',
                        '--tw-prose-headings': 'oklch(var(--color-base-content))',
                        '--tw-prose-links': 'oklch(var(--color-primary-content))',
                        '--tw-prose-bold': 'oklch(var(--color-base-content))',
                        '--tw-prose-counters': 'oklch(var(--color-base-content))',
                        '--tw-prose-bullets': 'oklch(var(--color-base-content))',
                        '--tw-prose-hr': 'oklch(var(--color-neutral-content))',
                        '--tw-prose-quotes': 'oklch(var(--color-base-content))',
                        '--tw-prose-quote-borders': 'oklch(var(--color-neutral-content))',
                        '--tw-prose-captions': 'oklch(var(--color-base-content))',
                        '--tw-prose-code': 'oklch(var(--color-base-content))',
                        '--tw-prose-pre-code': 'oklch(var(--color-base-content))',
                        '--tw-prose-pre-bg': 'oklch(var(--color-neutral-content))',
                        '--tw-prose-th-borders': 'oklch(var(--color-neutral-content))',
                        '--tw-prose-td-borders': 'oklch(var(--color-neutral-content))',
                    }
                },
                sm: {
                    css: {
                        maxWidth: '85ch',
                        fontSize: '0.875rem',
                    }
                },
                lg: {
                    css: {
                        maxWidth: '95ch',
                        fontSize: '1.125rem',
                    }
                },
                xl: {
                    css: {
                        maxWidth: '100ch',
                        fontSize: '1.25rem',
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
        themes: [
            // "light", 
            // "dark", 
            // "cupcake",
            "retro",
            // "garden",
            // "pastel",
            // "autumn",
            // "winter",
            // "nord",
            // "silk",

        ],
darkTheme: false,
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography'),
    ],
};
