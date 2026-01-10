<template>
  <div
    ref="previewContainer"
    class="flex items-center justify-center"
  >
    <PreviewPanelUpload
      v-if="!screenshotFile"
      v-model="screenshotFile"
    />
    <div
      v-else
      class="shrink-0 relative"
      :style="scaledPreviewStyles"
    >
      <CheckerboardBackground class="absolute inset-0 overflow-hidden">
        <ImageExportContainer>
          <PreviewPanelBackground />
          <PreviewPanelScreenshot />
        </ImageExportContainer>
      </CheckerboardBackground>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

import PreviewPanelUpload from './PreviewPanelUpload.vue';
import ImageExportContainer from './ImageExportContainer.vue';
import PreviewPanelScreenshot from './PreviewPanelScreenshot.vue';
import PreviewPanelBackground from './PreviewPanelBackground.vue';
import CheckerboardBackground from './CheckerboardBackground.vue';

const { canvasWidth, canvasHeight, previewScale } = useCanvasSettings();
const { screenshotFile } = useScreenshotSettings();

const previewContainerRef = useTemplateRef('previewContainer');
const { width: previewWidth, height: previewHeight } = useElementSize(previewContainerRef);

watch([previewWidth, previewHeight, canvasWidth, canvasHeight], () => {
  const scaleX = previewWidth.value / canvasWidth.value;
  const scaleY = previewHeight.value / canvasHeight.value;

  previewScale.value = Math.min(Math.min(scaleX, scaleY), 1);
}, { immediate: true });

const scaledPreviewStyles = computed(() => ({
  width: `${canvasWidth.value}px`,
  height: `${canvasHeight.value}px`,
  transform: `scale(${previewScale.value})`,
}));
</script>
