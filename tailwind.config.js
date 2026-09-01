import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Playfair Display', 'serif'],
                sansDisplay: ['Outfit', 'Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                outfit: ['Outfit', 'sans-serif'],
                jakarta: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                royalMaroon: {
                    50: '#fdf3f4',
                    100: '#fbe5e8',
                    200: '#f6cdd3',
                    300: '#f0aeb8',
                    400: '#e58293',
                    500: '#d55268',
                    600: '#c0334c',
                    700: '#8A1024',
                    800: '#700918',
                    900: '#530510',
                    950: '#40030a',
                },
                royalGold: {
                    300: '#f5e4bd',
                    400: '#ebd197',
                    500: '#D4AF37',
                    600: '#bca02f',
                    700: '#9d8122',
                },
                royalTeal: '#0a4d49',
                // New Accommodations Theme Colors
                'theme-green': '#1c3829',
                'theme-gold': '#d6b052',
                'theme-header': '#4d6a45',
                'theme-grad': '#234533',
                'badge-resort': '#6c8651',
                'badge-hotel': '#0b5394',
                'heart-pink': '#ff2b5e',
                'slider-track': '#d6e5db',
                'craft-brown': '#6F4E37',
                'craft-brown-dark': '#5C402E',
            },
        },
    },

    plugins: [forms],
};
