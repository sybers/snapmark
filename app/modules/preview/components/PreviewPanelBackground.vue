<script setup lang="ts">
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';

const {
  backgroundStyleAsCss,
  backgroundOpacity,
  backgroundRoundness,
  backgroundNoise,
  backgroundNoiseOpacity,
} = useBackgroundSettings();
</script>

<template>
  <div
    class="absolute inset-0 overflow-hidden"
    :style="{ borderRadius: `${backgroundRoundness}px`, opacity: backgroundOpacity / 100 }"
  >
    <div
      class="absolute inset-0"
      :style="{ background: backgroundStyleAsCss }"
    />
    <div
      v-if="backgroundNoise"
      class="absolute inset-0 noisy-background mix-blend-overlay bg-repeat"
      :style="{ opacity: backgroundNoiseOpacity / 100 }"
    />
  </div>
</template>

<style scoped>
  .noisy-background {
    background-image: url('~/assets/images/noise-texture.png');
  }
</style>
