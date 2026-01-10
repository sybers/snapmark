<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';

const exportContainerRef = useTemplateRef('exportContainerRef');

const { exportContainer } = useCanvasSettings();

onMounted(() => {
  exportContainer.value = exportContainerRef.value;
});

onUnmounted(() => {
  exportContainer.value = null;
});
</script>

<template>
  <div
    ref="exportContainerRef"
    class="absolute inset-0 flex items-center justify-center"
  >
    <slot />
  </div>
</template>
