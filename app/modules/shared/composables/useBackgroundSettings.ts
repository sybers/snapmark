import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '../stores/settings.store';
import type { BackgroundStyle } from '../types';

export function useBackgroundSettings() {
  const { settings } = storeToRefs(useSettingsStore());

  const backgroundStyle = computed({
    get: () => settings.value.background.backgroundStyle,
    set: (value) => {
      settings.value.background.backgroundStyle = value;
    },
  });

  const backgroundOpacity = computed({
    get: () => settings.value.background.opacity,
    set: (value) => {
      settings.value.background.opacity = value;
    },
  });

  const backgroundRoundness = computed({
    get: () => settings.value.background.roundness,
    set: (value) => {
      settings.value.background.roundness = value;
    },
  });

  const backgroundNoise = computed({
    get: () => settings.value.background.noise,
    set: (value) => {
      settings.value.background.noise = value;
    },
  });

  function getBackgroundStyleAsCss(style: BackgroundStyle): string {
    if (style.type === 'solid') {
      return `${style.color}`;
    }
    return `linear-gradient(${style.rotation}deg, ${style.stops.map((stop) => `${stop.color} ${stop.position}`).join(', ')})`;
  }

  const backgroundStyleAsCss = computed(() =>
    getBackgroundStyleAsCss(settings.value.background.backgroundStyle),
  );

  return {
    backgroundStyle,
    backgroundOpacity,
    backgroundRoundness,
    backgroundNoise,
    backgroundStyleAsCss,
    getBackgroundStyleAsCss,
  };
}
