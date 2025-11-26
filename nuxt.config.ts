// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/hints',
  ],
  imports: {
    autoImport: false,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
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
});
