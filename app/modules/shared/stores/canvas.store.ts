import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface CanvasStoreOptions {
  canvasWidth: number;
  canvasHeight: number;
}

export const useCanvasStore = defineStore('canvas', () => {
  const canvasWidth = ref(1200);
  const canvasHeight = ref(1200);
  const previewScale = ref(1);
  const previewScalePercentage = computed(() => Math.round(previewScale.value * 100));

  const exportContainer = ref<HTMLDivElement | null>(null);

  function importValues(values: CanvasStoreOptions) {
    canvasWidth.value = values.canvasWidth;
    canvasHeight.value = values.canvasHeight;
  }

  function exportValues(): CanvasStoreOptions {
    return {
      canvasWidth: canvasWidth.value,
      canvasHeight: canvasHeight.value,
    };
  }

  return {
    canvasWidth,
    canvasHeight,
    previewScale,
    previewScalePercentage,
    exportContainer,
    importValues,
    exportValues,
  };
});
