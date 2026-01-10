import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type BackgroundStyleSolid = {
  type: 'solid';
  color: string;
};

export type BackgroundStyleGradient = {
  type: 'gradient';
  rotation: number;
  stops: { color: string; position: string }[];
};

export type BackgroundStyle = BackgroundStyleSolid | BackgroundStyleGradient;
export type BackgroundType = BackgroundStyle['type'];

export interface BackgroundStoreOptions {
  backgroundStyle: BackgroundStyle;
  opacity: number;
  roundness: number;
  noise: boolean;
}

export const useBackgroundStore = defineStore('background', () => {
  const backgroundStyle = ref<BackgroundStyle>({
    type: 'gradient',
    rotation: 45,
    stops: [
      { color: '#fada61', position: '0.000%' },
      { color: '#ff9188', position: '50.000%' },
      { color: '#ff5acd', position: '100.000%' },
    ],
  });
  const roundness = ref(0);
  const opacity = ref(100);
  const noise = ref(true);

  const hasTransparency = computed(() => {
    return roundness.value > 0 || opacity.value < 100;
  });

  function importValues(values: BackgroundStoreOptions) {
    backgroundStyle.value = values.backgroundStyle;
    roundness.value = values.roundness;
    opacity.value = values.opacity;
    noise.value = values.noise;
  }

  function exportValues(): BackgroundStoreOptions {
    return {
      backgroundStyle: backgroundStyle.value,
      roundness: roundness.value,
      opacity: opacity.value,
      noise: noise.value,
    };
  }

  function getBackgroundStyleAsCss(style: BackgroundStyle): string {
    if (style.type === 'solid') {
      return `${style.color}`;
    }
    return `linear-gradient(${style.rotation}deg, ${style.stops.map((stop) => `${stop.color} ${stop.position}`).join(', ')})`;
  }

  return {
    backgroundStyle,
    backgroundStyleAsCss: computed(() => getBackgroundStyleAsCss(backgroundStyle.value)),
    roundness,
    opacity,
    noise,
    hasTransparency,
    getBackgroundStyleAsCss,
    importValues,
    exportValues,
  };
});
