<template>
  <UPopover mode="hover">
    <img
      :src="screenshot?.src"
      :alt="$t('upload.uploadedImage')"
      class="absolute"
      :style="{
        transform: `rotate(${rotation}deg) scale(${scale / 100})`,
        borderRadius: `${roundness}px`,
        boxShadow: boxShadow,
      }"
    >

    <template #content>
      <UFieldGroup>
        <UButton
          color="neutral"
          variant="ghost"
          icon="ci:crop"
          label="Crop"
        />
        <UButton
          color="neutral"
          variant="ghost"
          icon="ci:image-01"
          label="Replace screenshot"
          @click="upload"
        />
        <UButton
          color="neutral"
          variant="ghost"
          icon="ci:arrow-reload-02"
          label="Reset canvas"
          @click="screenshotStore.resetScreenshot"
        />
      </UFieldGroup>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { storeToRefs } from '#imports';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';
import { useFileUpload } from '../composables/useImageUpload';

const screenshotStore = useScreenshotStore();

const {
  screenshot,
  screenshotFile,
  rotation,
  scale,
  roundness,
  boxShadow,
} = storeToRefs(screenshotStore);

const { upload } = useFileUpload({
  accept: 'image/png, image/jpeg, image/svg+xml',
  model: screenshotFile,
});
</script>
