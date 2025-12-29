import { defineAppConfig } from '#imports';

export default defineAppConfig({
  toaster: {
    position: 'bottom-center' as const,
    duration: 1000,
    max: 3,
    progress: false,
    expand: false,
  },
  ui: {
    colors: {
      primary: 'snapmark',
      neutral: 'zinc',
    },
  },
});
