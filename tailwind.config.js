/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Look in any HTML files in the root and subdirectories
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html,css}", // For React/Vue/Angular projects, look in 'src' folder
    // Add other paths as needed, e.g., for specific folders in a monorepo
    // "./path/to/your/backend/templates/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};