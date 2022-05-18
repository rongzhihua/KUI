import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  if (command === 'build') {
      return defineConfig({
          plugins: [vue()],
          base: './',
          server: {
              open: true,
              proxy: {
                  '/api': {
                      target: 'http://127.0.0.1',
                      changeOrigin: true,
                      rewrite: (path) => path.replace(/^\/api/, '')
                  },
              }
          }
      })
  }
  return defineConfig({
      plugins: [vue()],
      server: {
          open: true,
          proxy: {
              '/api': {
                  target: 'http://127.0.0.1',
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, '')
              },
          }
      }
  })
}
