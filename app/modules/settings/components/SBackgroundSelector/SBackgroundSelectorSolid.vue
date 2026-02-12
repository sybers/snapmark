<script setup lang="ts">
import type { BackgroundStyle, BackgroundStyleSolid } from '~/modules/shared/types';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import { solidPresets } from './presets';
import SColorSwatch from './SColorSwatch.vue';

const { t } = useI18n();

const { getBackgroundStyleAsCss } = useBackgroundSettings();

const isShowingMore = ref(false);
const visiblePresets = computed(() => isShowingMore.value ? solidPresets : solidPresets.slice(0, 5));

const model = defineModel<BackgroundStyle>({ required: true });

function isSelectedPreset(preset: BackgroundStyleSolid) {
  if (model.value.type !== 'solid') {
    return false;
  }

  return model.value.color.toLowerCase() === preset.color.toLowerCase();
}

function selectPreset(preset: BackgroundStyleSolid) {
  model.value = structuredClone(preset);
}
</script>

<template>
  <div class="space-y-4">
    <label class="text-sm font-medium mb-2 block">{{ t('ui.solid') }}</label>
    <div class="grid grid-cols-8 lg:grid-cols-6 gap-2">
      <SColorSwatch
        v-for="preset in visiblePresets"
        :key="preset.color"
        :background-style="getBackgroundStyleAsCss(preset)"
        :is-selected="isSelectedPreset(preset)"
        @select="selectPreset(preset)"
      />
      <button
        v-if="solidPresets.length > 5"
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
