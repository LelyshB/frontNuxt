export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
  ],
  // либо вообще УБЕРИ свой css:[] (модуль и так подключит файл),
  // либо оставь, но с '@/' — без '~'.

  tailwindcss: { cssPath: '@/assets/css/tailwind.css', viewer: true },

  compatibilityDate: '2025-09-22', // заодно убирает варнинг Nitro
})
