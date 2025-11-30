import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCanvasStore = defineStore('canvas', () => {
  const canvasWidth = ref(1920);
  const canvasHeight = ref(1080);

  const exportContainer = ref<HTMLDivElement | null>(null);

  return {
    canvasWidth,
    canvasHeight,
    exportContainer,
  };
});
