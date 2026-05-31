function createUmamiScript(env: Record<string, string | undefined>) {
  if (env.NODE_ENV !== 'production') return undefined;

  if (!env.UMAMI_SCRIPT_SRC || !env.UMAMI_WEBSITE_ID) {
    console.log('Missing Umami script src or website ID, skipping...');
    return undefined;
  }

  return {
    'src': env.UMAMI_SCRIPT_SRC,
    'async': true,
    'data-website-id': env.UMAMI_WEBSITE_ID,
  };
}

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
    dirs: ['~/modules/app/components', '~/modules/shared/components'],
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: 'SnapMark - Turn screenshots into eye-catching social media images',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
      script: [createUmamiScript(process.env)],
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  nitro: {
    /** Workaround for a bug in nuxt-image module
    * see {@link https://github.com/nuxt/image/issues/2035#issuecomment-3666162555}
    * Also requires forcing css-tree to 2.2.1 via pnpm-workspace.yaml overrides
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
    defaultLocale: 'en',
  },
});
