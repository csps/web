import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('swiper-') || tag.startsWith('md-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 4000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          sweetalert2: ['sweetalert2'],
        },
        compact: true,
        experimentalMinChunkSize: 200000,
        entryFileNames: `assets/ucmncsps.[hash].js`,
        chunkFileNames: `assets/ucmncsps.[hash].js`,
        assetFileNames: `assets/ucmncsps.[hash].[ext]`,
      },
    }
  }
})
