<template>
  <div
    class="p-[6px] bg-linear-to-br from-white/50 to-gray-100/40 border border-white/30 backdrop-blur"
    :style="{ padding: `${framePadding}px`, borderRadius: `${frameRoundness}px` }"
  >
    <div
      class="overflow-hidden"
      :style="{ borderRadius: `${screenshotRoundness}px` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

const { screenshotRoundness } = useScreenshotSettings();

const framePadding = ref(6);
const frameRoundness = computed(() => {
  return screenshotRoundness.value + framePadding.value;
});
</script>
