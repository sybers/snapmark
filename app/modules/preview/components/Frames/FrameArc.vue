<script setup lang="ts">
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

const props = withDefaults(defineProps<{
  roundness?: number;
  scale?: number;
}>(), {
  scale: 1,
});

const { screenshotRoundness } = useScreenshotSettings();

const roundness = computed(() => props.roundness ?? screenshotRoundness.value);
const framePadding = computed(() => 6 * props.scale);
const frameRoundness = computed(() => roundness.value + framePadding.value);
</script>

<template>
  <div
    class="bg-linear-to-br from-white/50 to-gray-100/40 border border-white/30 backdrop-blur"
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
