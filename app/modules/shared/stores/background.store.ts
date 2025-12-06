import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBackgroundStore = defineStore('background', () => {
  const roundness = ref(0);

  const backgroundStyle = ref('#3cd284');
  const opacity = ref(100);

  return {
    roundness,
    backgroundStyle,
    opacity,
  };
});
