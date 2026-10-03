import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The original CRA project keeps JSX inside .js files,
// so we tell Vite / esbuild to treat .js in /src as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  // the old CRA /public folder held a template index.html — Vite uses /index.html at the root instead
  publicDir: "static",
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: { port: 3000, open: true },
});
