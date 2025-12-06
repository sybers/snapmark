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
  <div class="checkerboard absolute inset-0 overflow-hidden">
    <div
      ref="exportContainer"
      class="flex items-center justify-center rounded-lg absolute inset-0"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.checkerboard {
  --checkered-bg: #252525;
  background-image: linear-gradient(45deg, var(--checkered-bg) 25%,transparent 0),linear-gradient(-45deg,var(--checkered-bg) 25%,transparent 0),linear-gradient(45deg,transparent 75%,var(--checkered-bg) 0),linear-gradient(-45deg,transparent 75%,var(--checkered-bg) 0);
  background-size: 20px 20px;
  background-position: 0 0,0 10px,10px -10px,-10px 0;
}
</style>
