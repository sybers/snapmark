<script setup lang="ts">
import type { BackgroundStyle, BackgroundStyleGradient } from '~/modules/shared/types';

const { t } = useI18n();

const model = defineModel<BackgroundStyle>({ required: true });

const gradientRotationOptions = [0, 45, 90, 135, 180, 225, 270, 315] as const;
const gradientRotation = ref(model.value.type === 'gradient' ? model.value.rotation : 0);

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
  <div class="space-y-4">
    <label class="text-sm font-medium mb-2 block">{{ t('ui.gradientDirection') }}</label>
    <div class="grid grid-cols-8 lg:grid-cols-6 gap-2">
      <button
        v-for="rotation in gradientRotationOptions"
        :key="rotation"
        class="aspect-square rounded-md border flex items-center justify-center"
        :class="gradientRotation === rotation
          ? 'border-primary text-primary'
          : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400'"
        @click="selectGradientRotation(rotation)"
      >
        <UIcon
          name="heroicons:arrow-up-20-solid"
          :style="{ transform: `rotate(${rotation}deg)` }"
        />
      </button>
    </div>
  </div>
</template>
