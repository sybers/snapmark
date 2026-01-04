<template>
  <div
    class="overflow-hidden"
    :style="{ borderRadius: `${roundness}px` }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';
import { storeToRefs } from 'pinia';

const { roundness } = storeToRefs(useScreenshotStore());
</script>
