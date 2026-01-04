<template>
  <div
    class="overflow-hidden bg-white"
    :style="{ borderRadius: `${roundness}px` }"
  >
    <div class="flex items-center gap-2 py-4 pl-8">
      <div class="w-4 h-4 bg-red-500 rounded-full" />
      <div class="w-4 h-4 bg-yellow-500 rounded-full" />
      <div class="w-4 h-4 bg-green-500 rounded-full" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

const { roundness } = storeToRefs(useScreenshotStore());
</script>
