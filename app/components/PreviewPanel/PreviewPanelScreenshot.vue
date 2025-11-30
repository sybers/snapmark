<template>
  <img
    v-if="canvasStore.screenshot"
    :src="canvasStore.screenshot.src"
    alt="Uploaded Image"
    class="absolute"
    :style="{ transform: `rotate(${canvasStore.rotation}deg) scale(${canvasStore.scale})` }"
  >
</template>

<script setup lang="ts">
import { useCanvasStore } from '../../stores/canvas.store';

const canvasStore = useCanvasStore();
</script>
