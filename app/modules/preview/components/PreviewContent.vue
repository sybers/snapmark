<template>
  <div
    ref="previewContainer"
    class="flex items-center justify-center"
  >
    <PreviewPanelUpload
      v-if="!screenshotStore.screenshotFile"
      v-model="screenshotStore.screenshotFile"
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
import { storeToRefs } from 'pinia';
import { computed, useTemplateRef, watch } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

import PreviewPanelUpload from './PreviewPanelUpload.vue';
import ImageExportContainer from './ImageExportContainer.vue';
import PreviewPanelScreenshot from './PreviewPanelScreenshot.vue';
import PreviewPanelBackground from './PreviewPanelBackground.vue';
import CheckerboardBackground from './CheckerboardBackground.vue';

const canvasStore = useCanvasStore();
const screenshotStore = useScreenshotStore();

const { canvasWidth, canvasHeight } = storeToRefs(canvasStore);

const previewContainerRef = useTemplateRef('previewContainer');
const { width: previewWidth, height: previewHeight } = useElementSize(previewContainerRef);

watch([previewWidth, previewHeight, canvasWidth, canvasHeight], () => {
  const scaleX = previewWidth.value / canvasWidth.value;
  const scaleY = previewHeight.value / canvasHeight.value;

  canvasStore.previewScale = Math.min(Math.min(scaleX, scaleY), 1);
}, { immediate: true });

const scaledPreviewStyles = computed(() => ({
  width: `${canvasWidth.value}px`,
  height: `${canvasHeight.value}px`,
  transform: `scale(${canvasStore.previewScale})`,
}));
</script>
