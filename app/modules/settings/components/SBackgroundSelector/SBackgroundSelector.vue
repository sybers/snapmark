<script setup lang="ts">
import type { BackgroundStyle } from '~/modules/shared/types';
import SBackgroundSelectorSolid from './SBackgroundSelectorSolid.vue';
import SBackgroundSelectorGradient from './SBackgroundSelectorGradient.vue';
import SBackgroundSelectorGradientRotation from './SBackgroundSelectorGradientRotation.vue';

const model = defineModel<BackgroundStyle>({ required: true });
</script>

<template>
  <div class="space-y-4">
    <SBackgroundSelectorSolid v-model="model" />
    <SBackgroundSelectorGradient v-model="model" />
    <SBackgroundSelectorGradientRotation v-model="model" />
  </div>
</template>
