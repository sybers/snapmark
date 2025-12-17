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
      {{ $t('upload.uploadScreenshotToGetStarted') }}
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
      {{ $t('upload.uploadScreenshot') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';

const props = withDefaults(defineProps<{
  accept?: string;
}>(), {
  accept: 'image/png, image/jpeg, image/svg+xml',
});

const model = defineModel<File | null>({
  default: null,
});

const screenshotStore = useScreenshotStore();

function handleScreenshotUpload() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = props.accept;
  fileInput.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      model.value = file;
    }
  };
  fileInput.click();
}
</script>
