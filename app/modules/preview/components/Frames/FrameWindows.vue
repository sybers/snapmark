<template>
  <div
    class="overflow-hidden bg-white"
    :style="{ borderRadius: `${roundness}px` }"
  >
    <div
      class="flex items-center justify-end text-black"
      :style="{
        gap: `${24 * scale}px`,
        padding: `${16 * scale}px ${24 * scale}px`,
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="16 * scale"
        :height="16 * scale"
        fill="currentColor"
        viewBox="0 0 256 256"
      ><rect
        width="256"
        height="256"
        fill="none"
      /><line
        x1="40"
        y1="128"
        x2="216"
        y2="128"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      /></svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="16 * scale"
        :height="16 * scale"
        fill="currentColor"
        viewBox="0 0 256 256"
      ><rect
        width="256"
        height="256"
        fill="none"
      /><rect
        x="32"
        y="48"
        width="192"
        height="160"
        rx="8"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      /></svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="16 * scale"
        :height="16 * scale"
        fill="currentColor"
        viewBox="0 0 256 256"
      ><rect
        width="256"
        height="256"
        fill="none"
      /><line
        x1="200"
        y1="56"
        x2="56"
        y2="200"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      /><line
        x1="200"
        y1="200"
        x2="56"
        y2="56"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      /></svg>
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
