<template>
  <div
    class="overflow-hidden bg-white"
    :style="{ borderRadius: `${roundness}px` }"
  >
    <div class="flex items-center justify-end gap-6 py-4 px-6 text-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
        width="16"
        height="16"
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
        width="16"
        height="16"
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
import { storeToRefs } from 'pinia';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

const { roundness } = storeToRefs(useScreenshotStore());
</script>
