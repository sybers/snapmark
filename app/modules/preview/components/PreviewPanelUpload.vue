<template>
  <UCard
    variant="outline"
    class="shadow-xl"
  >
    <div class="text-center space-y-4">
      <UIcon
        name="i-heroicons-photo"
        class="w-16 h-16 mx-auto"
      />
      <p class="text-neutral-500">
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
      <i18n-t
        keypath="upload.pasteFromClipboard"
        tag="p"
        class="text-neutral-400 text-sm"
      >
        <template #kbd>
          <div class="inline-flex gap-0.5">
            <UKbd value="meta" />
            <span>+</span>
            <UKbd value="v" />
          </div>
        </template>
      </i18n-t>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';
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

useEventListener(document, 'paste', (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  const file = items[0]?.getAsFile();
  if (!file) return;

  model.value = file;
});
</script>
