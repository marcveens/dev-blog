/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // For now: 
    "@tailwindcss/postcss": {  optimize: { minify: false }},
  },
};

export default config;
