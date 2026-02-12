<script setup lang="ts">
import type { BackgroundStyle, BackgroundStyleGradient } from '~/modules/shared/types';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import { gradientPresets } from './presets';
import SColorSwatch from './SColorSwatch.vue';

const { getBackgroundStyleAsCss } = useBackgroundSettings();

const { t } = useI18n();

const model = defineModel<BackgroundStyle>({ required: true });
const gradientRotation = ref(model.value.type === 'gradient' ? model.value.rotation : 0);

const isShowingMore = ref(false);
const visiblePresets = computed(() => isShowingMore.value ? gradientPresets : gradientPresets.slice(0, 5));

function isSelectedPreset(preset: BackgroundStyleGradient) {
  if (model.value.type !== 'gradient') {
    return false;
  }

  return model.value.stops.every((stop, index) => stop.color === preset.stops[index]?.color);
}

function selectPreset(preset: BackgroundStyleGradient) {
  model.value = {
    ...preset,
    rotation: gradientRotation.value,
  };
}
</script>

<template>
  <div class="space-y-4">
    <label class="text-sm font-medium mb-2 block">{{ t('ui.gradient') }}</label>
    <div class="grid grid-cols-8 lg:grid-cols-6 gap-2">
      <SColorSwatch
        v-for="preset in visiblePresets"
        :key="preset.stops.map((stop) => stop.color).join(',')"
        :background-style="getBackgroundStyleAsCss(preset)"
        :is-selected="isSelectedPreset(preset)"
        @select="selectPreset(preset)"
      />
      <button
        v-if="gradientPresets.length > 5"
        :aria-label="isShowingMore ? t('ui.showLess') : t('ui.showMore')"
        :icon="isShowingMore ? 'heroicons:chevron-up-20-solid' : 'heroicons:chevron-down-20-solid'"
        class="aspect-square rounded-md border flex items-center justify-center text-primary"
        @click="isShowingMore = !isShowingMore"
      >
        <UIcon
          :name="isShowingMore ? 'heroicons:chevron-up-20-solid' : 'heroicons:chevron-down-20-solid'"
        />
      </button>
    </div>
  </div>
</template>
