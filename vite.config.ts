
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
  // Optimize build output
  build: {
    minify: mode === 'production' ? 'esbuild' : false, // Using esbuild instead of terser for better compatibility
    sourcemap: false,
    // For Netlify performance
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    // Simplified chunking for better Netlify compatibility
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-toast'],
        },
      },
    },
    // Use stable target for Netlify
    target: 'es2019',
  },
  plugins: [
    react({
      devTarget: 'es2022',
      tsDecorators: true,
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize for Netlify
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lovable-tagger'],
  },
}));
