<script setup lang="ts">
import { useI18n } from '#imports';
import { useEventListener, useDropZone } from '@vueuse/core';
import { useFileUpload } from '../composables/useImageUpload';

const { t } = useI18n();

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

const { isOverDropZone } = useDropZone(document, {
  dataTypes: ['image/png', 'image/jpeg', 'image/svg+xml'],
  onDrop(files) {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file) return;

    model.value = file;
  },
});

useEventListener(document, 'paste', (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  const file = items[0]?.getAsFile();
  if (!file) return;

  model.value = file;
});
</script>

<template>
  <UCard
    variant="outline"
    :class="{ 'ring-2 ring-primary bg-primary/5': isOverDropZone }"
    class="shadow-xl transition-all duration-200"
  >
    <div class="text-center space-y-5">
      <div class="space-y-2">
        <UIcon
          :name="isOverDropZone ? 'i-heroicons-arrow-down-tray' : 'i-heroicons-photo'"
          class="w-12 h-12 mx-auto text-neutral-400 transition-all duration-200"
          :class="{ 'scale-110 text-primary': isOverDropZone }"
        />
        <p class="text-neutral-500 text-sm">
          {{ isOverDropZone ? t('upload.dropToUpload') : t('upload.uploadScreenshotToGetStarted') }}
        </p>
      </div>

      <div
        v-if="!isOverDropZone"
        class="space-y-3"
      >
        <UButton
          color="primary"
          size="lg"
          @click="upload"
        >
          <UIcon
            name="i-heroicons-arrow-up-tray"
            class="w-5 h-5 mr-2"
          />
          {{ t('upload.uploadScreenshot') }}
        </UButton>

        <p class="text-neutral-500 text-xs flex items-center justify-center gap-2">
          <span class="inline-flex items-center gap-1">
            <UKbd
              value="meta"
              size="sm"
            />
            <UKbd
              value="v"
              size="sm"
            />
          </span>
          <USeparator
            orientation="vertical"
            class="h-3"
          />
          <span>{{ t('upload.orDragAndDrop') }}</span>
        </p>
      </div>
    </div>
  </UCard>
</template>
