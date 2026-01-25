<script setup lang="ts">
import { useI18n } from '#imports';
import { computed } from 'vue';
import type { BackgroundStyle, BackgroundStyleSolid } from '~/modules/shared/types';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import { solidPresets } from './presets';
import SColorSwatch from './SColorSwatch.vue';

const { getBackgroundStyleAsCss } = useBackgroundSettings();

const { t } = useI18n();

const model = defineModel<BackgroundStyle>({ required: true });

const rgbModel = computed({
  get: () => {
    if (model.value.type !== 'solid') {
      return model.value.stops[0]?.color ?? '#000000';
    }

    return model.value.color;
  },
  set: (value: string) => {
    model.value = { type: 'solid', color: value };
  },
});

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
  <UColorPicker
    v-model="rgbModel"
    class="p-2 w-full"
    :ui="{ selector: 'w-full' }"
  />
  <div>
    <label class="text-sm font-medium mb-2 block">{{ t('ui.colorSwatches') }}</label>
    <div class="grid grid-cols-6 gap-2">
      <SColorSwatch
        v-for="preset in solidPresets"
        :key="preset.color"
        :background-style="getBackgroundStyleAsCss(preset)"
        :is-selected="isSelectedPreset(preset)"
        @click="selectPreset(preset)"
      />
    </div>
  </div>
</template>
