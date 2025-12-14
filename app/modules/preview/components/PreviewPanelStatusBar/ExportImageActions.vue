<script setup lang="ts">
import { computed, defineShortcuts, extractShortcuts, reactive, useI18n, useToast, watch } from '#imports';
import { toPng, toJpeg, toSvg, toBlob } from 'html-to-image';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';
import { useBackgroundStore } from '~/modules/shared/stores/background.store';

const toast = useToast();

const canvasStore = useCanvasStore();
const backgroundStore = useBackgroundStore();

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
  { label: 'SVG', value: 'SVG' },
];

const { t } = useI18n();

const exportOptions = computed(() => [
  {
    label: t('export.asPng'),
    kbds: ['meta', 'p'],
    onSelect: () => {
      exportSettings.format = 'PNG';
      saveImage();
    },
  },
  {
    label: t('export.asJpeg'),
    kbds: ['meta', 'j'],
    onSelect: () => {
      exportSettings.format = 'JPEG';
      saveImage();
    },
  },
  {
    label: t('export.asSvg'),
    kbds: ['meta', 'g'],
    onSelect: () => {
      exportSettings.format = 'SVG';
      saveImage();
    },
  },
]);

type ExportSettings = {
  pixelRatio: number;
} & ({
  format: 'PNG' | 'SVG';
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
  if (!canvasStore.exportContainer)
    return;

  const formatFunctions = {
    PNG: toPng,
    JPEG: toJpeg,
    SVG: toSvg,
  };

  const formatFunction = formatFunctions[exportSettings.format];
  if (!formatFunction) {
    return;
  }

  const dataUrl = await formatFunction(canvasStore.exportContainer, {
    pixelRatio: exportSettings.pixelRatio,
    quality: exportSettings.format === 'JPEG' ? (exportSettings.quality / 100) : undefined,
    filter: (el) => el.dataset?.exportExcluded === undefined,
  });

  const downloadLink = document.createElement('a');
  downloadLink.download = `snapmark-export-${new Date().toISOString()}.${exportSettings.format.toLowerCase()}`;
  downloadLink.href = dataUrl;
  downloadLink.click();
}

async function copyImageToClipboard(): Promise<void> {
  try {
    await elementToImageClipboard(canvasStore.exportContainer);
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

async function elementToImageClipboard(el: HTMLElement | null): Promise<void> {
  if (!el) {
    throw new Error('Export container not found');
  }

  const pngImageBlob = await toBlob(el, {
    pixelRatio: 1,
  });
  if (!pngImageBlob) {
    throw new Error('Failed to create PNG image blob');
  }

  navigator.clipboard.write([
    new ClipboardItem({
      [pngImageBlob.type]: pngImageBlob,
    }),
  ]);
}

defineShortcuts(computed(() => ({
  ...extractShortcuts(exportOptions.value),
  meta_s: saveImage,
  meta_c: copyImageToClipboard,
})));
</script>

<template>
  <div class="flex gap-2">
    <UPopover
      :ui="{ content: 'w-[320px]' }"
      :items="exportOptions"
    >
      <UTooltip
        :text="$t('export.settings')"
        :delay-duration="50"
        :content="{ side: 'top' }"
      >
        <UButton
          :aria-label="$t('export.settings')"
          color="neutral"
          variant="outline"
          icon="heroicons:adjustments-horizontal-16-solid"
        />
      </UTooltip>

      <template #content>
        <div class="p-6 space-y-6">
          <h3 class="text-lg font-medium">
            {{ $t('export.settings') }}
          </h3>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">{{ $t('ui.format') }}</label>
            <URadioGroup
              v-model="exportSettings.format"
              orientation="horizontal"
              variant="table"
              indicator="hidden"
              size="sm"
              :items="exportFormatOptions"
              :ui="{ item: 'grow' }"
            />

            <UAlert
              v-if="exportSettings.format === 'JPEG' && backgroundStore.hasTransparency"
              color="neutral"
              variant="subtle"
              :title="$t('export.jpegNoTransparency')"
              :description="$t('export.jpegTransparencyDescription')"
            />
          </div>

          <div
            v-if="exportSettings.format === 'JPEG'"
            class="flex flex-col gap-2"
          >
            <label class="text-sm font-medium">{{ $t('ui.quality') }}</label>
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
            <label class="text-sm font-medium">{{ $t('ui.scale') }} <span class="text-xs text-neutral-500">{{ exportSettings.pixelRatio }}x</span></label>
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
            <label class="text-sm font-medium">{{ $t('export.outputResolution') }}</label>
            <div class="text-xs text-neutral-500">
              {{ canvasStore.canvasWidth * exportSettings.pixelRatio }} × {{ canvasStore.canvasHeight * exportSettings.pixelRatio }}
            </div>
          </div>
        </div>
      </template>
    </UPopover>

    <UTooltip
      :text="$t('export.copyPngToClipboard')"
      :delay-duration="50"
      :content="{ side: 'top' }"
      :kbds="['meta', 'C']"
      @click="copyImageToClipboard"
    >
      <UButton
        :label="$t('export.copyToClipboard')"
        color="neutral"
        variant="outline"
      />
    </UTooltip>

    <UFieldGroup>
      <UTooltip
        :text="`${$t('ui.save')} ${exportSettings.format}`"
        :delay-duration="50"
        :content="{ side: 'top' }"
        :kbds="['meta', 's']"
        @click="saveImage"
      >
        <UButton
          color="primary"
          variant="subtle"
          :label="$t('ui.save')"
        />
      </UTooltip>

      <UDropdownMenu
        :ui="{ content: 'w-[180px]' }"
        :items="exportOptions"
      >
        <UButton
          color="primary"
          variant="subtle"
          icon="heroicons:chevron-down-20-solid"
        />
      </UDropdownMenu>
    </UFieldGroup>
  </div>
</template>
