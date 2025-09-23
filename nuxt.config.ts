export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'],
  tailwindcss: { cssPath: '@/assets/css/tailwind.css', viewer: true },
  compatibilityDate: '2025-09-22',
})