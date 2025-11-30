<template>
  <img
    v-if="screenshotStore.screenshot"
    :src="screenshotStore.screenshot.src"
    alt="Uploaded Image"
    class="absolute"
    :style="{
      transform: `rotate(${screenshotStore.rotation}deg) scale(${screenshotStore.scale})`,
      borderRadius: screenshotStore.roundness + 'px',
      boxShadow: screenshotStore.boxShadow,
    }"
  >
</template>

<script setup lang="ts">
import { useScreenshotStore } from '~/stores/screenshot.store';

const screenshotStore = useScreenshotStore();
</script>
