<script setup lang="ts">
import type { Settings } from '~/modules/shared/types';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import { useSettingsStore } from '~/modules/shared/stores/settings.store';
import PresetPreviewFrame from './PresetPreviewFrame.vue';

const props = defineProps<{
  preset: {
    name: string;
    settings: Settings;
  };
}>();

defineEmits<{
  load: [];
  delete: [];
}>();

const { t } = useI18n();

const settingsStore = useSettingsStore();
const { getBackgroundStyleAsCss } = useBackgroundSettings();

const backgroundCss = computed(() =>
  getBackgroundStyleAsCss(props.preset.settings.background.backgroundStyle),
);

const previewRoundness = computed(() =>
  Math.min(props.preset.settings.background.roundness, 12),
);

const screenshotRoundness = computed(() =>
  Math.min(props.preset.settings.screenshot.roundness, 8),
);

const previewImage = computed(() => {
  if (settingsStore.screenshot) {
    return settingsStore.screenshot.src;
  }
  return null;
});
</script>

<template>
  <div
    class="group relative aspect-square rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-pointer"
    @click="$emit('load')"
  >
    <div
      class="absolute inset-0 overflow-hidden"
      :style="{ borderRadius: `${previewRoundness}px` }"
    >
      <div
        class="absolute inset-0"
        :style="{
          background: backgroundCss,
          opacity: preset.settings.background.opacity / 100,
          borderRadius: `${previewRoundness}px`,
        }"
      />
      <div
        v-if="preset.settings.background.noiseOpacity > 0"
        class="absolute inset-0 bg-repeat mix-blend-overlay"
        :style="{ borderRadius: `${previewRoundness}px`, opacity: preset.settings.background.noiseOpacity / 100 }"
      />

      <div
        class="absolute inset-0 flex items-center justify-center p-4"
        :style="{
          transform: `translate(${preset.settings.screenshot.offset.y}%, ${preset.settings.screenshot.offset.x}%) rotate(${preset.settings.screenshot.rotation}deg) scale(${preset.settings.screenshot.scale / 100})`,
        }"
      >
        <PresetPreviewFrame
          class="w-full"
          :frame="preset.settings.frame"
          :roundness="screenshotRoundness"
          :scale="0.5"
          :style="{
            boxShadow: preset.settings.screenshot.boxShadow,
            transform: `perspective(1000px) rotateX(${-preset.settings.screenshot.perspective.x}deg) rotateY(${preset.settings.screenshot.perspective.y}deg)`,
          }"
        >
          <div class="aspect-video">
            <img
              v-if="previewImage"
              :src="previewImage"
              alt="Preview"
              class="w-full h-full object-cover"
            >
            <div
              v-else
              class="w-full h-full bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-600 dark:to-neutral-700 flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-photo"
                class="w-8 h-8 text-neutral-400 dark:text-neutral-500"
              />
            </div>
          </div>
        </PresetPreviewFrame>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 bg-linear-to-t from-black/60 via-black/40 to-transparent">
      <div class="flex flex-col min-w-0">
        <span class="font-medium text-sm text-white truncate">
          {{ preset.name }}
        </span>
        <span class="text-xs text-white/70 tabular-nums">
          {{ preset.settings.canvas.canvasWidth }} × {{ preset.settings.canvas.canvasHeight }}
        </span>
      </div>
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        :aria-label="t('presets.delete')"
        @click.stop="$emit('delete')"
      >
        <UIcon
          name="i-heroicons-trash"
          class="w-4 h-4 text-red-400 hover:text-red-300"
        />
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.noisy-background {
  background-image: url('~/assets/images/noise-texture.png');
  background-repeat: repeat;
  mix-blend-mode: luminosity;
}
</style>
