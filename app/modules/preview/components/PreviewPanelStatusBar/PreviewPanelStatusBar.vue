<script setup lang="ts">
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';
import ExportImageActions from './ExportImageActions.vue';
import SContainer from '~/modules/shared/components/SContainer.vue';

const { canvasWidth, canvasHeight, previewScalePercentage } = useCanvasSettings();
</script>

<template>
  <SContainer>
    <div class="flex items-center justify-between">
      <div class="text-sm text-neutral-500">
        {{ canvasWidth }} × {{ canvasHeight }} ({{ previewScalePercentage }}%)
      </div>

      <ExportImageActions />
    </div>
  </SContainer>
</template>
