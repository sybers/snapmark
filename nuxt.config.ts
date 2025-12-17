// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/test-utils',
    '@nuxt/hints',
    '@nuxtjs/i18n',
  ],
  components: {
    dirs: [],
  },
  imports: {
    autoImport: false,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'bun',
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        arrowParens: true,
        braceStyle: '1tbs',
      },
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
    ],
    defaultLocale: 'fr',
  },
});
