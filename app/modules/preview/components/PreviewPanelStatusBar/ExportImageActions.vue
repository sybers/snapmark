<script setup lang="ts">
import { defineShortcuts, extractShortcuts, reactive, useToast, watch } from '#imports';
import { toPng, toJpeg, toSvg, toBlob } from 'html-to-image';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';

const toast = useToast();

const canvasStore = useCanvasStore();

const exportOptions = [
  {
    label: 'as PNG',
    kbds: ['meta', 'p'],
    onSelect: () => {
      exportSettings.format = 'PNG';
      saveImage();
    },
  },
  {
    label: 'as JPG',
    kbds: ['meta', 'j'],
    onSelect: () => {
      exportSettings.format = 'JPG';
      saveImage();
    },
  },
  {
    label: 'as SVG',
    kbds: ['meta', 'g'],
    onSelect: () => {
      exportSettings.format = 'SVG';
      saveImage();
    },
  },
];

type ExportSettings = {
  pixelRatio: number;
} & ({
  format: 'PNG' | 'SVG';
} | {
  format: 'JPG';
  quality: number;
});

const exportSettings = reactive<ExportSettings>({
  format: 'PNG',
  pixelRatio: window.devicePixelRatio,
});
watch(() => exportSettings.format, (format) => {
  // @ts-expect-error - quality is only defined for jpg format
  exportSettings.quality = format === 'JPG' ? 80 : undefined;
}, { immediate: true });

async function saveImage() {
  if (!canvasStore.exportContainer)
    return;

  const formatFunctions = {
    PNG: toPng,
    JPG: toJpeg,
    SVG: toSvg,
  };

  const formatFunction = formatFunctions[exportSettings.format];
  if (!formatFunction) {
    return;
  }

  const dataUrl = await formatFunction(canvasStore.exportContainer, {
    pixelRatio: exportSettings.pixelRatio,
    quality: exportSettings.format === 'JPG' ? (exportSettings.quality / 100) : undefined,
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
      title: 'Image copied to clipboard',
      icon: 'i-lucide-clipboard',
    });
  } catch (error: unknown) {
    console.error(error);
    toast.add({
      color: 'error',
      title: 'Failed to copy image to clipboard',
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

defineShortcuts({
  ...extractShortcuts(exportOptions),
  meta_s: saveImage,
  meta_c: copyImageToClipboard,
});
</script>

<template>
  <div class="flex gap-2">
    <UPopover
      :ui="{ content: 'min-w-[320px]' }"
      :items="exportOptions"
    >
      <UTooltip
        text="Export settings"
        :delay-duration="50"
        :content="{ side: 'top' }"
      >
        <UButton
          aria-label="Export settings"
          color="neutral"
          variant="outline"
          icon="heroicons:adjustments-horizontal-16-solid"
        />
      </UTooltip>

      <template #content>
        <div class="p-6 space-y-6">
          <h3 class="text-lg font-medium">
            Export settings
          </h3>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">Format</label>
            <URadioGroup
              v-model="exportSettings.format"
              orientation="horizontal"
              variant="table"
              indicator="hidden"
              size="sm"
              :items="['PNG', 'JPG', 'SVG']"
              :ui="{ item: 'grow' }"
            />
          </div>

          <div
            v-if="exportSettings.format === 'JPG'"
            class="flex flex-col gap-2"
          >
            <label class="text-sm font-medium">Quality</label>
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
            <label class="text-sm font-medium">Scale <span class="text-xs text-neutral-500">{{ exportSettings.pixelRatio }}x</span></label>
            <URadioGroup
              v-model="exportSettings.pixelRatio"
              orientation="horizontal"
              variant="table"
              indicator="hidden"
              size="sm"
              :items="[{ label: '1x', value: 1 }, { label: '2x', value: 2 }, { label: '3x', value: 3 }, { label: '4x', value: 4 }, { label: '6x', value: 6 }]"
              :ui="{ item: 'grow' }"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">Output resolution</label>
            <div class="text-xs text-neutral-500">
              {{ canvasStore.canvasWidth * exportSettings.pixelRatio }} × {{ canvasStore.canvasHeight * exportSettings.pixelRatio }}
            </div>
          </div>
        </div>
      </template>
    </UPopover>

    <UTooltip
      text="Copy PNG image to clipboard"
      :delay-duration="50"
      :content="{ side: 'top' }"
      :kbds="['meta', 'C']"
      @click="copyImageToClipboard"
    >
      <UButton
        label="Copy to clipboard"
        color="neutral"
        variant="outline"
      />
    </UTooltip>

    <UFieldGroup>
      <UTooltip
        :text="`Save as ${exportSettings.format}`"
        :delay-duration="50"
        :content="{ side: 'top' }"
        :kbds="['meta', 's']"
        @click="saveImage"
      >
        <UButton
          color="primary"
          variant="subtle"
          label="Save"
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
