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
  app: {
    head: {
      title: 'SnapMark - Turn screenshots into eye-catching social media images',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'bun',
    /** This is a workaround to fix a bug in nuxt-image module
    * see {@link https://github.com/nuxt/image/issues/2035#issuecomment-3666162555}
    * The bug fix also requires to force the css-tree version to 2.2.1 in the package.json resolutions section
    */
    externals: {
      traceInclude: [
        'node_modules/css-tree/data/patch.json',
      ],
    },
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
