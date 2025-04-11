// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Fitting Orbit',
      meta: [
        { name: 'description', content: 'Scan food products and check syns easily with Fitting Orbit.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})