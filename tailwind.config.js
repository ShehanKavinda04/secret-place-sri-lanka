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
                // New Accommodations Theme Colors
                'theme-green': '#1c3829',
                'theme-gold': '#d6b052',
                'theme-header': '#4d6a45',
                'theme-grad': '#234533',
                'badge-resort': '#6c8651',
                'badge-hotel': '#0b5394',
                'heart-pink': '#ff2b5e',
                'slider-track': '#d6e5db'
            },
        },
    },

    plugins: [forms],
};
