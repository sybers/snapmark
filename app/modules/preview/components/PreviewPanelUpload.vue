<template>
  <div
    v-if="!screenshotStore.screenshot"
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
</template>

<script setup lang="ts">
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

const screenshotStore = useScreenshotStore();

function handleScreenshotUpload() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/png, image/jpeg, image/svg+xml';
  fileInput.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      screenshotStore.setScreenshot(file);
    }
  };
  fileInput.click();
}
</script>
