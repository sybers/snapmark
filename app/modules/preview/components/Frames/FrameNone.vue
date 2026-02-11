<script setup lang="ts">
import { computed } from 'vue';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

const props = defineProps<{
  roundness?: number;
}>();

const { screenshotRoundness } = useScreenshotSettings();

const roundness = computed(() => props.roundness ?? screenshotRoundness.value);
</script>

<template>
  <div
    class="overflow-hidden"
    :style="{ borderRadius: `${roundness}px` }"
  >
    <slot />
  </div>
</template>
