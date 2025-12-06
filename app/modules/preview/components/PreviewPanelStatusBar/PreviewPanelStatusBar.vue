<script setup lang="ts">
import { storeToRefs } from '#imports';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';
import ExportImageActions from './ExportImageActions.vue';

const canvasStore = useCanvasStore();

const { canvasWidth, canvasHeight, previewScalePercentage } = storeToRefs(canvasStore);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-sm text-neutral-500">
      {{ canvasWidth }} × {{ canvasHeight }} ({{ previewScalePercentage }}%)
    </div>

    <ExportImageActions />
  </div>
</template>
