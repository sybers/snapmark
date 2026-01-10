<template>
  <div
    class="overflow-hidden"
    :style="{ borderRadius: `${screenshotRoundness}px` }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

const { screenshotRoundness } = useScreenshotSettings();
</script>
