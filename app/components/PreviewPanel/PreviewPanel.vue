<template>
  <div class="flex-1 lg:w-3/4 bg-white dark:bg-neutral-950 p-4 flex flex-col min-h-[50vh]">
    <div class="flex-1 min-h-0 relative">
      <div
        ref="previewContainer"
        class="absolute inset-0 overflow-hidden flex items-center justify-center"
      >
        <div
          class="bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0 overflow-hidden flex items-center justify-center"
          :style="{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            transform: `scale(${previewScale})`,
          }"
        >
          <div
            v-if="!canvasStore.screenshot"
            class="text-center space-y-4"
          >
            <UIcon
              name="i-heroicons-photo"
              class="w-16 h-16 mx-auto text-neutral-400"
            />
            <p class="text-neutral-500 dark:text-neutral-400">
              Upload a screenshot to get started
            </p>
            <UButton
              color="primary"
              size="lg"
              @click="handleScreenshotUpload"
            >
              <UIcon
                name="i-heroicons-arrow-up-tray"
                class="w-5 h-5 mr-2"
              />
              Upload Screenshot
            </UButton>
          </div>

          <img
            v-if="canvasStore.screenshot"
            :src="canvasStore.screenshot.src"
            alt="Uploaded Image"
            class="absolute"
            :style="{ transform: `rotate(${canvasStore.rotation}deg) scale(${canvasStore.scale})` }"
          >
        </div>
      </div>
    </div>

    <div class="shrink-0 pt-4">
      <div class="flex items-center justify-between">
        <div class="text-sm text-neutral-500">
          {{ canvasWidth }} × {{ canvasHeight }} ({{ (previewScale * 100).toFixed(0) }}%)
        </div>

        <div class="flex gap-2">
          <UTooltip
            text="Copy PNG image to clipboard"
            :delay-duration="50"
            :content="{ side: 'top' }"
            :kbds="['meta', 'C']"
          >
            <UButton
              label="Copy"
              color="neutral"
              icon="i-heroicons-clipboard"
              variant="outline"
            />
          </UTooltip>

          <UFieldGroup size="xl">
            <UTooltip
              text="Save as PNG"
              :delay-duration="50"
              :content="{ side: 'top' }"
              :kbds="['meta', 's']"
            >
              <UButton
                color="neutral"
                variant="subtle"
                label="Save"
              />
            </UTooltip>

            <UDropdownMenu
              :ui="{ content: 'w-[180px]' }"
              :items="[
                {
                  label: 'as PNG',
                  kbds: ['meta', 's'],
                },
                {
                  label: 'as JPG',
                  kbds: ['meta', 'j'],
                },
                {
                  label: 'as SVG',
                  kbds: ['meta', 'g'],
                },
              ]"
            >
              <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-chevron-down"
              />
            </UDropdownMenu>
          </UFieldGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, useTemplateRef } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useCanvasStore } from '../../stores/canvas.store';

const canvasStore = useCanvasStore();

const { canvasWidth, canvasHeight } = storeToRefs(canvasStore);

const el = useTemplateRef('previewContainer');
const { width: previewWidth, height: previewHeight } = useElementSize(el);
const previewScale = computed(() => {
  const scaleX = previewWidth.value / canvasWidth.value;
  const scaleY = previewHeight.value / canvasHeight.value;

  return Math.min(Math.min(scaleX, scaleY), 1);
});

function handleScreenshotUpload() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      canvasStore.setScreenshot(file);
    }
  };
  fileInput.click();
}
</script>
