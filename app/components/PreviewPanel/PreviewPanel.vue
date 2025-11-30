<template>
  <div class="flex-1 lg:w-3/4 bg-white dark:bg-neutral-950 p-4 flex flex-col min-h-[50vh]">
    <div class="flex-1 min-h-0 relative">
      <div
        ref="previewContainer"
        class="absolute inset-0 overflow-hidden flex items-center justify-center"
      >
        <div
          class="shrink-0 relative"
          :style="{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            transform: `scale(${previewScale})`,
          }"
        >
          <ImageExportContainer>
            <PreviewPanelUpload />

            <PreviewPanelScreenshot />
          </ImageExportContainer>
        </div>
      </div>
    </div>

    <PreviewPanelStatusBar
      class="shrink-0 pt-4"
      :preview-scale="previewScale"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, useTemplateRef } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useCanvasStore } from '../../stores/canvas.store';

import PreviewPanelUpload from './PreviewPanelUpload.vue';
import ImageExportContainer from './ImageExportContainer.vue';
import PreviewPanelScreenshot from './PreviewPanelScreenshot.vue';
import PreviewPanelStatusBar from './PreviewPanelStatusBar/PreviewPanelStatusBar.vue';

const canvasStore = useCanvasStore();

const { canvasWidth, canvasHeight } = storeToRefs(canvasStore);

const el = useTemplateRef('previewContainer');
const { width: previewWidth, height: previewHeight } = useElementSize(el);
const previewScale = computed(() => {
  const scaleX = previewWidth.value / canvasWidth.value;
  const scaleY = previewHeight.value / canvasHeight.value;

  return Math.min(Math.min(scaleX, scaleY), 1);
});
</script>
