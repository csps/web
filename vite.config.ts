import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "~": "/src"
    }
  },
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 200000,
        entryFileNames: `assets/csps.[hash].js`,
        chunkFileNames: `assets/csps.[hash].js`,
        assetFileNames: `assets/csps.[hash].[ext]`,
        compact: true,
      },
    }
  }
})
