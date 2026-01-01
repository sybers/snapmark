<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from '#imports';

const model = defineModel<string>({ required: true });

type ColorType = 'gradient' | 'solid';

const { t } = useI18n();

const colorTypeOptions = computed(() => [
  { label: t('ui.gradient'), value: 'gradient' as ColorType },
  { label: t('ui.solid'), value: 'solid' as ColorType },
]);

const selectedColorType = ref<ColorType>('gradient');

const solidPresets: string[] = [
  '#0f172a',
  '#1e293b',
  '#111827',
  '#f5f5f5',
  '#e5e7eb',
  '#fef3c7',
  '#faf5ff',
  '#e11d48',
  '#ec4899',
  '#f97316',
  '#facc15',
  '#22c55e',
  '#16a34a',
  '#0ea5e9',
  '#38bdf8',
  '#6366f1',
  '#4f46e5',
  '#a855f7',
];

const gradientPresets: string[] = [
  'linear-gradient(135deg, #ffffc4 0.000%, #ff6164 50.000%, #b00012 100.000%)',
  'linear-gradient(45deg, #fada61 0.000%, #ff9188 50.000%, #ff5acd 100.000%)',
  'linear-gradient(45deg, #4159d0 0.000%, #c84fc0 50.000%, #ffcd70 100.000%)',
  'linear-gradient(90deg, #07aeea 0.000%, #2bf598 100.000%)',
  'linear-gradient(135deg, #000041 0.000%, #225772 50.000%, #5bc39a 100.000%)',
  'linear-gradient(45deg, #fc8ec5 0.000%, #ff8dd3 25.000%, #ffa1d8 50.000%, #ffc1d2 75.000%, #ffe0c3 100.000%)',
  'linear-gradient(135deg, #81FFEF 10%, #F067B4 100%)',
  'linear-gradient(135deg, #F05F57 10%, #360940 100%)',
  'linear-gradient(135deg, #FDD819 10%, #E80505 100%)',
  'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
  'linear-gradient(90.8deg, rgb(27,53,68) 2.2%, rgb(110,180,135) 84%)',
  'radial-gradient(circle 934px at 6% 39.5%, rgb(255,35,90) 0.2%, rgb(255,35,144) 54.8%, rgb(250,99,160) 93.4% )',
  'linear-gradient(90deg, #ffffff 0.000%, #e7ffff 16.667%, #cdfcff 33.333%, #b5e9f4 50.000%, #a3d7db 66.667%, #9ac6c5 83.333%, #9bb8b4 100.000%)',
  'linear-gradient(240deg, #70ffd3 0.000%, #72ffd2 4.000%, #74fcd1 8.000%, #76f7d0 12.000%, #78f1d0 16.000%, #79ecd1 20.000%, #7be6d2 24.000%, #7ce0d4 28.000%, #7edad6 32.000%, #7fd3d9 36.000%, #80ccdd 40.000%, #81c6e1 44.000%, #82bfe5 48.000%, #83b7ea 52.000%, #83b0ee 56.000%, #84a9f3 60.000%, #84a2f8 64.000%, #849afe 68.000%, #8493ff 72.000%, #848bff 76.000%, #8484ff 80.000%, #847cff 84.000%, #8375ff 88.000%, #826eff 92.000%, #8266ff 96.000%, #815fff 100.000%)',
  'linear-gradient(to right, #00ffff, #ffff00)',
  'linear-gradient(33deg, #594a0a 0.000%, #594a0a 14.286%, #9f5c0d calc(14.286% + 1px), #9f5c0d 28.571%, #e37612 calc(28.571% + 1px), #e37612 42.857%, #ff9618 calc(42.857% + 1px), #ff9618 57.143%, #ffbc1f calc(57.143% + 1px), #ffbc1f 71.429%, #ffe627 calc(71.429% + 1px), #ffe627 85.714%, #ffff2f calc(85.714% + 1px) 100.000%)',
  'linear-gradient(135deg, #312c00 0.000%, #312c00 14.286%, #332e1e calc(14.286% + 1px), #332e1e 28.571%, #323149 calc(28.571% + 1px), #323149 42.857%, #2c3377 calc(42.857% + 1px), #2c3377 57.143%, #2436a2 calc(57.143% + 1px), #2436a2 71.429%, #1a39c0 calc(71.429% + 1px), #1a39c0 85.714%, #113ccc calc(85.714% + 1px) 100.000%)',
  'linear-gradient(135deg, #d0415e 0.000%, #d0415e 20.000%, #d65767 calc(20.000% + 1px), #d65767 40.000%, #db7971 calc(40.000% + 1px), #db7971 60.000%, #e0a57c calc(60.000% + 1px), #e0a57c 80.000%, #e6d886 calc(80.000% + 1px) 100.000%)',
];

const selectedPresets = computed(() => {
  return selectedColorType.value === 'solid' ? solidPresets : gradientPresets;
});

const isSelectedPreset = (preset: string) => {
  return model.value === preset;
};
</script>

<template>
  <UPopover
    :content="{ side: 'bottom', align: 'center' }"
    :ui="{ content: 'w-[320px]' }"
  >
    <div class="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md p-2">
      <div
        class="h-4 w-full rounded-sm"
        :style="{ background: model }"
      />
    </div>

    <template #content="{ close }">
      <div class="p-6 space-y-6">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center gap-2">
            <label class="text-lg font-bold">{{ $t('ui.color') }}</label>
            <UButton
              icon="heroicons:x-mark-20-solid"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </div>
          <URadioGroup
            v-model="selectedColorType"
            orientation="horizontal"
            variant="table"
            indicator="hidden"
            size="sm"
            :items="colorTypeOptions"
            :ui="{ item: 'grow' }"
          />
        </div>

        <div
          v-if="['solid', 'gradient'].includes(selectedColorType)"
          class="grid grid-cols-6 gap-2"
        >
          <div
            v-for="preset in selectedPresets"
            :key="preset"
            class="flex items-center justify-center"
          >
            <span
              class="block w-full aspect-square rounded-full border"
              :class="{
                'border-neutral-300 dark:border-neutral-700': !isSelectedPreset(preset),
                'border-primary': isSelectedPreset(preset),
              }"
              :style="{ background: preset }"
              @click="model = preset"
            />
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
