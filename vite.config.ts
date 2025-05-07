
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Netlify specific adjustments
  base: '/',
  // Simplified build settings that work reliably on Netlify
  build: {
    minify: true,
    sourcemap: false,
    // Disable chunk size warnings
    chunkSizeWarningLimit: 1600,
    // Simple and reliable chunking strategy for Netlify
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Compatible target for wider browser support
    target: 'es2018',
  },
  plugins: [
    react({
      tsDecorators: true,
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lovable-tagger'],
  },
}));
