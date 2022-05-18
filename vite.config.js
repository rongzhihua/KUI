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
                      target: 'http://139.9.190.116',
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
                  target: 'http://139.9.190.116',
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, '')
              },
          }
      }
  })
}
