import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 9000, // ✅ comma was missing here
    proxy: {
      '/Login': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/users': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/current-user': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/payment/verify-payment': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/payment/create-order': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/delete-account': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/Signup': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/verify-token': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      },
      '/reqst': {
        target: 'https://appsail-50037084678.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
