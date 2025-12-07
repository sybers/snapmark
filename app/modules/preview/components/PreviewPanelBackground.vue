<template>
  <div
    class="absolute inset-0"
    :style="{
      background: backgroundStyle,
      opacity: opacity / 100,
      borderRadius: `${roundness}px`,
    }"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from '#imports';
import { useBackgroundStore } from '~/modules/shared/stores/background.store';

const { backgroundStyle, opacity, roundness } = storeToRefs(useBackgroundStore());
</script>
