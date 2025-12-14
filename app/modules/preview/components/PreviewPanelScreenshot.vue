<template>
  <img
    :src="screenshot?.src"
    :alt="$t('upload.uploadedImage')"
    class="absolute"
    :style="{
      transform: `rotate(${rotation}deg) scale(${scale / 100})`,
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
