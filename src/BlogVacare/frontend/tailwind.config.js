module.exports = {

    content : [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
        colors: {
            primary: {
            light: '#a3e635',
            DEFAULT: '#4ade80',
            dark: '#166534',
            },
            neutral: {
            light: '#f3f4f6',
            DEFAULT: '#6b7280',
            dark: '#374151',
            },
        },
        },
    },
};
