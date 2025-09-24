// front-nuxt/nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-09-23',
  css: ['~/assets/css/index.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})