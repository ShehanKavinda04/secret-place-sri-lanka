import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Playfair Display', 'serif'],
                sansDisplay: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                royalMaroon: {
                    950: '#40030a',
                    900: '#530510',
                    800: '#700918',
                    700: '#8A1024',
                },
                royalGold: {
                    300: '#f5e4bd',
                    400: '#ebd197',
                    500: '#D4AF37',
                    600: '#bca02f',
                    700: '#9d8122',
                },
                royalTeal: '#0a4d49',
            },
        },
    },

    plugins: [forms],
};
