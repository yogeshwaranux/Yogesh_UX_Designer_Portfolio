import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  
  // CSS & Preprocessor Settings
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true,
      },
    },
    postcss: null,
  },

  // Development Server Settings
  server: {
    port: 5173,
    strictPort: false,
    open: false,
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },

  // Build Settings
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    sourcemap: false,
    reportCompressedSize: true,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        work: path.resolve(__dirname, 'work.html'),
        skills: path.resolve(__dirname, 'skills.html'),
        contact: path.resolve(__dirname, 'contact.html')
      },
      output: {
        manualChunks: undefined,
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'images/[name].[hash][extname]';
          } else if (/\.css$/.test(name ?? '')) {
            return 'css/[name].[hash][extname]';
          }
          return '[name].[hash][extname]';
        },
      },
    },
  },

  // Asset Handling
  assetsInclude: ['**/*.pdf', '**/*.woff', '**/*.woff2'],

  // Dependency Optimization
  optimizeDeps: {
    include: [],
    exclude: [],
  },

  // Resolver Settings
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },

  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});
