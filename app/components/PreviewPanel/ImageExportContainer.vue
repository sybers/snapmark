<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useCanvasStore } from '~/stores/canvas.store';

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
    class="absolute inset-0 overflow-hidden flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg"
  >
    <slot />
  </div>
</template>
