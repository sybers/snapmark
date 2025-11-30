<script setup lang="ts">
import { storeToRefs } from '#imports';
import { useCanvasStore } from '~/stores/canvas.store';
import ExportImageActions from './ExportImageActions.vue';

defineProps<{
  previewScale: number;
}>();

const canvasStore = useCanvasStore();

const { canvasWidth, canvasHeight } = storeToRefs(canvasStore);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-sm text-neutral-500">
      {{ canvasWidth }} × {{ canvasHeight }} ({{ Math.round(previewScale * 100) }}%)
    </div>

    <ExportImageActions />
  </div>
</template>
