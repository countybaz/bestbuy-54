
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
    minify: mode === 'production' ? 'terser' : 'esbuild',
    sourcemap: false,
    // For Netlify performance
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    // Disable code splitting for smaller apps
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React dependencies into a separate chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI components
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-toast'],
          // Utilities
          'utils-vendor': ['clsx', 'tailwind-merge', 'date-fns'],
        },
      },
    },
    // Speed up Netlify build
    target: 'es2018',
  },
  plugins: [
    react({
      // Remove fastRefresh as it's not a valid option
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
