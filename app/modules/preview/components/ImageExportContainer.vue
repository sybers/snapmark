<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';

const exportContainer = useTemplateRef('exportContainer');

const canvasStore = useCanvasStore();

onMounted(() => {
  canvasStore.exportContainer = exportContainer.value;
});

onUnmounted(() => {
  canvasStore.exportContainer = null;
});
</script>

<template>
  <div
    ref="exportContainer"
    class="absolute inset-0 flex items-center justify-center"
  >
    <slot />
  </div>
</template>
