<template>
  <img
    :src="screenshot?.src"
    alt="Uploaded Image"
    class="absolute"
    :style="{
      transform: `rotate(${rotation}deg) scale(${scale})`,
      borderRadius: `${roundness}px`,
      boxShadow: boxShadow,
    }"
  >
</template>

<script setup lang="ts">
import { storeToRefs } from '#imports';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

const { screenshot, rotation, scale, roundness, boxShadow } = storeToRefs(useScreenshotStore());
</script>
