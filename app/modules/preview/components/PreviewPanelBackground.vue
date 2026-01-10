<script setup lang="ts">
import { storeToRefs } from '#imports';
import { useBackgroundStore } from '~/modules/shared/stores/background.store';

const { backgroundStyleAsCss, opacity, roundness, noise } = storeToRefs(useBackgroundStore());
</script>

<template>
  <div
    class="absolute inset-0 overflow-hidden"
    :style="{ borderRadius: `${roundness}px`, opacity: opacity / 100 }"
  >
    <div
      class="absolute inset-0"
      :style="{ background: backgroundStyleAsCss }"
    />
    <div
      v-if="noise"
      class="absolute inset-0 noisy-background"
    />
  </div>
</template>

<style scoped>
  .noisy-background {
    background-image: url('~/assets/images/noise-texture.png');
    background-repeat: repeat;
    mix-blend-mode: luminosity;
    opacity: 0.25;
  }
</style>
