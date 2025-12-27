<template>
  <div class="text-center space-y-4">
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
      @click="upload"
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
import { useFileUpload } from '../composables/useImageUpload';

const props = withDefaults(defineProps<{
  accept?: string;
}>(), {
  accept: 'image/png, image/jpeg, image/svg+xml',
});

const model = defineModel<File | null>({
  default: null,
});

const { upload } = useFileUpload({
  accept: props.accept,
  model,
});
</script>
