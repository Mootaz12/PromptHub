module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "light-theme-gradient":
          "linear-gradient(135deg, rgba(219, 234, 254, 0.8), rgba(234, 192, 252, 0.8), rgba(253, 224, 239, 0.8))",
        "dark-theme-gradient":
          "linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(55, 65, 81, 0.9), rgba(75, 85, 99, 0.9))",
      },
      colors: {
        primary: "#4F46E5", //primary color (Indigo)
        secondary: "#3B82F6", //secondary color (Blue)
        accent: "#F59E0B", //accent color (Amber)
        neutral: {
          100: "#F3F4F6", // Light gray
          200: "#E5E7EB", // Gray
          300: "#D1D5DB", // Darker gray
          400: "#9CA3AF", // Even darker gray
          500: "#6B7280", // Dark gray
          600: "#4B5563", // Very dark gray
          700: "#374151", // Darker
          800: "#1F2937", // Darkest
          900: "#111827", // Almost black
        },
        success: "#10B981", // Green for success messages
        warning: "#F59E0B", // Amber for warnings
        error: "#EF4444", // Red for errors
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        mono: ["Source Code Pro", "Menlo", "monospace"],
        popping: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
