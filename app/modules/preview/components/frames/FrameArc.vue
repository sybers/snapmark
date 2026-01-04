<template>
  <div
    class="p-[6px] bg-linear-to-br from-white/50 to-gray-100/40 border border-white/30 backdrop-blur"
    :style="{ padding: `${framePadding}px`, borderRadius: `${frameRoundness}px` }"
  >
    <div
      class="overflow-hidden"
      :style="{ borderRadius: `${roundness}px` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

const screenshotStore = useScreenshotStore();

const { roundness } = storeToRefs(screenshotStore);

const framePadding = ref(6);
const frameRoundness = computed(() => {
  return roundness.value + framePadding.value;
});
</script>
