import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

// ######################################################################

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     port: 5173,
//     host: true,
//     proxy: {
//       "/api": {
//         target: "http://localhost:3001",
//         changeOrigin: true,
//       },
//     },
//   },
//   build: {
//     outDir: "dist",
//     sourcemap: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ["react", "react-dom"],
//           ui: ["lucide-react"],
//         },
//       },
//     },
//   },
//   optimizeDeps: {
//     include: ["react", "react-dom", "lucide-react"],
//   },
// });
