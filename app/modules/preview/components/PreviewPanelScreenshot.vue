<template>
  <UPopover mode="hover">
    <div
      class="absolute"
      :style="{ transform: `translate(${screenshotOffset.y}%, ${screenshotOffset.x}%) rotate(${screenshotRotation}deg) scale(${screenshotScale / 100})` }"
    >
      <PreviewPanelFrame
        :style="{
          boxShadow: screenshotBoxShadow,
          transform: `perspective(1000px) rotateX(${-screenshotPerspective.x}deg) rotateY(${screenshotPerspective.y}deg)`,
        }"
      >
        <img
          :src="screenshot?.src"
          :alt="$t('upload.uploadedImage')"
        >
      </PreviewPanelFrame>
    </div>

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
          @click="resetScreenshot"
        />
      </UFieldGroup>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { useOverlay } from '#imports';
import { useFileUpload } from '../composables/useImageUpload';
import CropImageModal from './CropImageModal.vue';
import PreviewPanelFrame from './PreviewPanelFrame.vue';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';

const {
  screenshotFile,
  screenshotDataURL,
  screenshot,
  screenshotRotation,
  screenshotPerspective,
  screenshotOffset,
  screenshotScale,
  screenshotBoxShadow,
  resetScreenshot,
  setScreenshotDataURL,
} = useScreenshotSettings();

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
    setScreenshotDataURL(result.croppedDataURL);
  }
}
</script>
