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
          :label="$t('cropper.actions.crop')"
          @click="openCropImageModal"
        />
        <UButton
          color="neutral"
          variant="ghost"
          icon="ci:image-01"
          :label="$t('upload.replaceScreenshot')"
          @click="upload"
        />
        <UButton
          color="neutral"
          variant="ghost"
          icon="ci:arrow-reload-02"
          :label="$t('upload.resetCanvas')"
          @click="screenshotStore.resetScreenshot"
        />
      </UFieldGroup>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { storeToRefs, useOverlay } from '#imports';
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';
import { useFileUpload } from '../composables/useImageUpload';
import CropImageModal from './CropImageModal.vue';

const screenshotStore = useScreenshotStore();

const {
  screenshotFile,
  screenshotDataURL,
  screenshot,
  rotation,
  scale,
  roundness,
  boxShadow,
} = storeToRefs(screenshotStore);

const { upload } = useFileUpload({
  accept: 'image/png, image/jpeg, image/svg+xml',
  model: screenshotFile,
});

const overlay = useOverlay();

const modal = overlay.create(CropImageModal);

async function openCropImageModal() {
  if (!screenshotDataURL.value) {
    return;
  }

  const result = await modal.open({
    imageDataURL: screenshotDataURL.value,
  });
  if (result.success) {
    screenshotStore.setScreenshotDataURL(result.croppedDataURL);
  }
}
</script>
