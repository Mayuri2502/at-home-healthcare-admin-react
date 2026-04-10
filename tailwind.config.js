/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#526674',
        secondary: '#F8FAFC',
        accent: '#3B82F6',
        danger: '#EF4444',
        success: '#10B981',
        surface: '#FFFFFF',
        border: '#E2E8F0'
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px'
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px'
      }
    },
  },
  plugins: [],
}
