<script setup lang="ts">
import { defineShortcuts, extractShortcuts } from '#imports';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { useCanvasStore } from '~/stores/canvas.store';

const canvasStore = useCanvasStore();

const exportOptions = [
  {
    label: 'as PNG',
    kbds: ['meta', 's'],
    onSelect: () => saveImage('png'),
  },
  {
    label: 'as JPG',
    kbds: ['meta', 'j'],
    onSelect: () => saveImage('jpg'),
  },
  {
    label: 'as SVG',
    kbds: ['meta', 'g'],
    onSelect: () => saveImage('svg'),
  },
];

async function saveImage(format: 'png' | 'jpg' | 'svg' = 'png') {
  if (!canvasStore.exportContainer)
    return;

  const formatFunctions = {
    png: toPng,
    jpg: toJpeg,
    svg: toSvg,
  };

  const formatFunction = formatFunctions[format];
  if (!formatFunction) {
    return;
  }

  const dataUrl = await formatFunction(canvasStore.exportContainer);

  const downloadLink = document.createElement('a');
  downloadLink.download = `snapmark-export-${new Date().toISOString()}.${format}`;
  downloadLink.href = dataUrl;
  downloadLink.click();
}

defineShortcuts({
  ...extractShortcuts(exportOptions),
  meta_c: () => {
    console.log('meta_c');
    console.log('copy image to clipboard');
  },
});
</script>

<template>
  <div class="flex gap-2">
    <UTooltip
      text="Copy PNG image to clipboard"
      :delay-duration="50"
      :content="{ side: 'top' }"
      :kbds="['meta', 'C']"
      @click="saveImage('png')"
    >
      <UButton
        label="Copy"
        color="neutral"
        icon="i-heroicons-clipboard"
        variant="outline"
      />
    </UTooltip>

    <UFieldGroup size="xl">
      <UTooltip
        text="Save as PNG"
        :delay-duration="50"
        :content="{ side: 'top' }"
        :kbds="['meta', 's']"
        @click="saveImage('png')"
      >
        <UButton
          color="neutral"
          variant="subtle"
          label="Save"
        />
      </UTooltip>

      <UDropdownMenu
        :ui="{ content: 'w-[180px]' }"
        :items="exportOptions"
      >
        <UButton
          color="neutral"
          variant="outline"
          icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </UFieldGroup>
  </div>
</template>
