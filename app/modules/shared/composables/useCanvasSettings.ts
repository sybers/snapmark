import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useSettingsStore } from '../stores/settings.store';

export function useCanvasSettings() {
  const { settings } = storeToRefs(useSettingsStore());

  const canvasWidth = computed({
    get: () => settings.value.canvas.canvasWidth,
    set: (value) => {
      settings.value.canvas.canvasWidth = value;
    },
  });

  const canvasHeight = computed({
    get: () => settings.value.canvas.canvasHeight,
    set: (value) => {
      settings.value.canvas.canvasHeight = value;
    },
  });

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
}
