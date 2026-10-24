import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiChatDevPlugin = () => ({
  name: 'api-chat-dev-middleware',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url?.startsWith('/api/chat') && req.method === 'POST') {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const rawBody = Buffer.concat(chunks).toString();
          req.body = rawBody ? JSON.parse(rawBody) : {};

          res.status = (code: number) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return res.end(JSON.stringify(data));
          };

          const { default: chatHandler } = await import('./api/chat.js' as any);
          await chatHandler(req, res);
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
        return;
      }
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), apiChatDevPlugin()],
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
