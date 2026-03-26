module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    '@tailwindcss/typography': {},
    'autoprefixer': {}    
  },
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%':   { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
      },
    },
  },
}
