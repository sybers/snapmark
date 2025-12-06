import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCanvasStore = defineStore('canvas', () => {
  const canvasWidth = ref(1200);
  const canvasHeight = ref(1200);
  const previewScale = ref(1);
  const previewScalePercentage = computed(() => Math.round(previewScale.value * 100));

  const exportContainer = ref<HTMLDivElement | null>(null);

  return {
    canvasWidth,
    canvasHeight,
    previewScale,
    previewScalePercentage,
    exportContainer,
  };
});
