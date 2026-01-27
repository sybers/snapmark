<script setup lang="ts">
import { computed, defineShortcuts, extractShortcuts, reactive, useI18n, useToast, watch } from '#imports';
import { domToPng, domToJpeg, domToBlob } from 'modern-screenshot';
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';

const toast = useToast();

const pixelRatioOptions = [
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
  { label: '4x', value: 4 },
  { label: '6x', value: 6 },
];

const exportFormatOptions = [
  { label: 'PNG', value: 'PNG' },
  { label: 'JPEG', value: 'JPEG' },
];

const { exportContainer } = useCanvasSettings();
const canExportImage = computed(() => Boolean(exportContainer.value));
const { canvasWidth, canvasHeight } = useCanvasSettings();

const { t } = useI18n();

const exportOptions = computed(() => [
  {
    label: t('export.asFormat', { format: 'PNG' }),
    kbds: ['meta', 'p'],
    onSelect: () => {
      exportSettings.format = 'PNG';
      saveImage();
    },
  },
  {
    label: t('export.asFormat', { format: 'JPEG' }),
    kbds: ['meta', 'j'],
    onSelect: () => {
      exportSettings.format = 'JPEG';
      saveImage();
    },
  },
  {
    type: 'separator' as const,
  },
  {
    label: t('export.openInNewTab'),
    kbds: ['meta', 'o'],
    onSelect: () => {
      openImageInNewTab();
    },
  },
  {
    label: t('export.copyToClipboard'),
    kbds: ['meta', 'c'],
    onSelect: () => {
      copyImageToClipboard();
    },
  },
]);

type ExportSettings = {
  pixelRatio: number;
} & ({
  format: 'PNG';
} | {
  format: 'JPEG';
  quality: number;
});

const exportSettings = reactive<ExportSettings>({
  format: 'PNG',
  pixelRatio: window.devicePixelRatio,
});
watch(() => exportSettings.format, (format) => {
  // @ts-expect-error - quality is only defined for JPEG format
  exportSettings.quality = format === 'JPEG' ? 80 : undefined;
}, { immediate: true });

async function saveImage() {
  if (!exportContainer.value)
    return;

  const formatFunctions = {
    PNG: domToPng,
    JPEG: domToJpeg,
  };

  const formatFunction = formatFunctions[exportSettings.format];
  if (!formatFunction) {
    return;
  }

  const dataUrl = await formatFunction(exportContainer.value, {
    width: canvasWidth.value,
    height: canvasHeight.value,
    scale: exportSettings.pixelRatio,
    quality: exportSettings.format === 'JPEG' ? (exportSettings.quality / 100) : undefined,
    filter: (el) => (el as HTMLElement).dataset?.exportExcluded === undefined,
  });

  const downloadLink = document.createElement('a');
  downloadLink.download = `snapmark-export-${new Date().toISOString()}.${exportSettings.format.toLowerCase()}`;
  downloadLink.href = dataUrl;
  downloadLink.click();
}

async function copyImageToClipboard(): Promise<void> {
  try {
    await elementToImageClipboard(exportContainer.value);
    toast.add({
      title: t('export.imageCopiedToClipboard'),
      icon: 'i-lucide-clipboard',
    });
  } catch (error: unknown) {
    console.error(error);
    toast.add({
      color: 'error',
      title: t('export.failedToCopyImageToClipboard'),
      icon: 'i-lucide-clipboard-x',
    });
  }
}

async function openImageInNewTab(): Promise<void> {
  if (!exportContainer.value) {
    throw new Error('Export container not found');
  }

  const pngImageBlob = await getImageBlob(exportContainer.value);
  const url = URL.createObjectURL(pngImageBlob);
  window.open(url, '_blank');
}

async function getImageBlob(el: HTMLElement): Promise<Blob> {
  const pngImageBlob = await domToBlob(el, {
    scale: Math.min(window.devicePixelRatio, 3),
    filter: (node) => (node as HTMLElement).dataset?.exportExcluded === undefined,
    width: canvasWidth.value,
    height: canvasHeight.value,
  });

  if (!pngImageBlob) {
    throw new Error('Failed to create PNG image blob');
  }

  return pngImageBlob;
}

async function elementToImageClipboard(el: HTMLElement | null): Promise<void> {
  if (!el) {
    throw new Error('Export container not found');
  }

  const pngImageBlob = await getImageBlob(el);

  navigator.clipboard.write([
    new ClipboardItem({
      [pngImageBlob.type]: pngImageBlob,
    }),
  ]);
}

defineShortcuts(computed(() => ({
  ...extractShortcuts(exportOptions.value),
  meta_s: saveImage,
})));
</script>

<template>
  <div class="flex gap-2">
    <UPopover
      :ui="{ content: 'w-[320px]' }"
      :items="exportOptions"
    >
      <UTooltip
        :text="t('export.settings')"
        :delay-duration="50"
        :content="{ side: 'top' }"
      >
        <UButton
          :disabled="!canExportImage"
          :aria-label="t('export.settings')"
          color="neutral"
          variant="outline"
          size="xl"
          icon="heroicons:adjustments-horizontal-16-solid"
        />
      </UTooltip>

      <template #content>
        <div class="p-6 space-y-6">
          <h3 class="text-lg font-medium">
            {{ t('export.settings') }}
          </h3>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ t('ui.format') }}</label>
            <URadioGroup
              v-model="exportSettings.format"
              orientation="horizontal"
              variant="table"
              indicator="hidden"
              size="sm"
              :items="exportFormatOptions"
              :ui="{ item: 'grow' }"
            />
          </div>

          <div
            v-if="exportSettings.format === 'JPEG'"
            class="flex flex-col gap-2"
          >
            <label class="text-sm font-medium">{{ t('ui.quality') }}</label>
            <USlider
              v-model="exportSettings.quality"
              :min="0"
              :max="100"
              :step="1"
            />
            <div class="text-xs text-neutral-500 text-right">
              {{ exportSettings.quality }}
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ t('ui.scale') }} <span class="text-xs text-neutral-500">{{ exportSettings.pixelRatio }}x</span></label>
            <URadioGroup
              v-model="exportSettings.pixelRatio"
              orientation="horizontal"
              variant="table"
              indicator="hidden"
              size="sm"
              :items="pixelRatioOptions"
              :ui="{ item: 'grow' }"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ t('export.outputResolution') }}</label>
            <div class="text-xs text-neutral-500">
              {{ canvasWidth * exportSettings.pixelRatio }} × {{ canvasHeight * exportSettings.pixelRatio }}
            </div>
          </div>
        </div>
      </template>
    </UPopover>

    <UFieldGroup>
      <UTooltip
        :text="t('export.asFormat', { format: exportSettings.format })"
        :delay-duration="50"
        :content="{ side: 'top' }"
        :kbds="['meta', 's']"
        @click="saveImage"
      >
        <UButton
          :disabled="!canExportImage"
          icon="i-heroicons-arrow-down-tray-20-solid"
          color="primary"
          size="xl"
          variant="subtle"
          :label="t('ui.save')"
        />
      </UTooltip>

      <UDropdownMenu
        :ui="{ content: 'min-w-[180px]' }"
        :items="exportOptions"
      >
        <UButton
          :disabled="!canExportImage"
          color="primary"
          size="xl"
          variant="subtle"
          icon="heroicons:chevron-down-20-solid"
        />
      </UDropdownMenu>
    </UFieldGroup>
  </div>
</template>
