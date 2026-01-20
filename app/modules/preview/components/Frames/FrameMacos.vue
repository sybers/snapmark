<template>
  <div
    class="overflow-hidden bg-white"
    :style="{ borderRadius: `${roundness}px` }"
  >
    <div
      class="flex items-center"
      :style="{
        gap: `${8 * scale}px`,
        padding: `${16 * scale}px ${32 * scale}px`,
      }"
    >
      <div
        class="bg-red-500 rounded-full"
        :style="{ width: `${16 * scale}px`, height: `${16 * scale}px` }"
      />
      <div
        class="bg-yellow-500 rounded-full"
        :style="{ width: `${16 * scale}px`, height: `${16 * scale}px` }"
      />
      <div
        class="bg-green-500 rounded-full"
        :style="{ width: `${16 * scale}px`, height: `${16 * scale}px` }"
      />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

const props = withDefaults(defineProps<{
  roundness?: number;
  scale?: number;
}>(), {
  scale: 1,
});

const { screenshotRoundness } = useScreenshotSettings();

const roundness = computed(() => props.roundness ?? screenshotRoundness.value);
const scale = computed(() => props.scale);
</script>
