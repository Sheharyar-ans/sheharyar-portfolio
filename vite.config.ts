import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  esbuild: {
    target: 'esnext'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    reportCompressedSize: false,
    rollupOptions: isSsrBuild
      ? {}
      : {
          treeshake: {
            moduleSideEffects: 'no-external',
            propertyReadSideEffects: false,
            tryCatchDeoptimization: false
          },
          output: {
            manualChunks: {
              'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
              'vendor-motion': ['framer-motion', 'gsap', 'lenis'],
              'vendor-icons': ['lucide-react']
            }
          }
        }
  }
}));
