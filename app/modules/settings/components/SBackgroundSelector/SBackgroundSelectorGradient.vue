<script setup lang="ts">
import { ref } from 'vue';
import { gradientPresets } from './presets';
import SColorSwatch from './SColorSwatch.vue';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import type { BackgroundStyle, BackgroundStyleGradient } from '~/modules/shared/types';

const { getBackgroundStyleAsCss } = useBackgroundSettings();

const model = defineModel<BackgroundStyle>({ required: true });

const gradientRotationOptions = [0, 45, 90, 135, 180, 225, 270, 315] as const;
const gradientRotation = ref(model.value.type === 'gradient' ? model.value.rotation : 0);

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

function selectGradientRotation(rotation: number) {
  gradientRotation.value = rotation;

  if (model.value.type !== 'gradient') {
    return;
  }

  selectPreset(model.value);
}
</script>

<template>
  <div class="grid grid-cols-6 gap-2">
    <SColorSwatch
      v-for="preset in gradientPresets"
      :key="preset.stops.map((stop) => stop.color).join(',')"
      :background-style="getBackgroundStyleAsCss(preset)"
      :is-selected="isSelectedPreset(preset)"
      @click="selectPreset(preset)"
    />
  </div>

  <div>
    <label class="text-sm font-medium mb-2 block">{{ $t('ui.gradientDirection') }}</label>
    <div class="grid grid-cols-4 gap-2">
      <UButton
        v-for="rotation in gradientRotationOptions"
        :key="rotation"
        class="h-12 justify-center items-center"
        :color="gradientRotation === rotation ? 'primary' : 'neutral'"
        variant="outline"
        size="sm"
        @click="selectGradientRotation(rotation)"
      >
        <UIcon
          name="heroicons:arrow-up-20-solid"
          :style="{ transform: `rotate(${rotation}deg)` }"
        />
      </UButton>
    </div>
  </div>
</template>
