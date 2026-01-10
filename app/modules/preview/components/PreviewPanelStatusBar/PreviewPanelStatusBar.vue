<script setup lang="ts">
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';
import ExportImageActions from './ExportImageActions.vue';

const { canvasWidth, canvasHeight, previewScalePercentage } = useCanvasSettings();
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-sm text-neutral-500">
      {{ canvasWidth }} × {{ canvasHeight }} ({{ previewScalePercentage }}%)
    </div>

    <ExportImageActions />
  </div>
</template>
