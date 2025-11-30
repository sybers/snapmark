<template>
  <div class="w-full h-full lg:w-1/4 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 overflow-y-auto">
    <ControlPanelHeader />

    <USeparator class="mb-2" />

    <ControlPanelSection title="Background">
      <div>
        <label class="text-xs text-neutral-500 mb-2 block">Type</label>
        <URadioGroup
          v-model="backgroundType"
          :items="backgroundTypes"
        />
      </div>

      <div v-if="backgroundType === 'gradient'">
        <label class="text-xs text-neutral-500 mb-2 block">Gradient Colors</label>
        <div class="flex gap-2">
          <SColorChooser
            v-model="gradientStart"
            label="Gradient Start"
          />
          <SColorChooser
            v-model="gradientEnd"
            label="Gradient End"
          />
        </div>
      </div>

      <div v-if="backgroundType === 'solid'">
        <label class="text-xs text-neutral-500 mb-2 block">Color</label>
        <SColorChooser
          v-model="solidColor"
          label="Color"
        />
      </div>
    </ControlPanelSection>

    <USeparator class="mb-2" />

    <ControlPanelSection title="Shadow">
      <template #title-right>
        <USwitch v-model="shadowEnabled" />
      </template>

      <div v-if="shadowEnabled">
        <label class="block mb-2 text-sm font-medium">Intensity</label>
        <USlider
          v-model="shadowIntensity"
          :min="0"
          :max="100"
          color="primary"
        />
        <div class="text-xs text-neutral-500 text-right mt-1">
          {{ shadowIntensity }}%
        </div>
      </div>
    </ControlPanelSection>

    <USeparator class="mb-2" />

    <ControlPanelSection title="Corner Radius">
      <USlider
        id="corner-radius"
        v-model="cornerRadius"
        :min="0"
        :max="50"
      />
      <div class="text-xs text-neutral-500 text-right">
        {{ cornerRadius }}px
      </div>
    </ControlPanelSection>

    <USeparator class="mb-2" />

    <ControlPanelSection title="Canvas Size">
      <USelectMenu
        v-model="selectedCanvasSize"
        :options="canvasSizes"
        placeholder="Select preset"
      />

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-xs text-neutral-500 mb-2 block">Width</label>
          <UInput
            v-model="canvasWidth"
            type="number"
          />
        </div>
        <div>
          <label class="text-xs text-neutral-500 mb-2 block">Height</label>
          <UInput
            v-model="canvasHeight"
            type="number"
          />
        </div>
      </div>
    </ControlPanelSection>

    <USeparator class="mb-2" />

    <ControlPanelSection title="Presets">
      <div class="grid grid-cols-2 gap-2">
        <UButton
          color="neutral"
          variant="outline"
          block
        >
          <UIcon
            name="i-heroicons-bookmark"
            class="w-4 h-4 mr-2"
          />
          Save Preset
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
        >
          <UIcon
            name="i-heroicons-folder-open"
            class="w-4 h-4 mr-2"
          />
          Load
        </UButton>
      </div>
    </ControlPanelSection>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from '#imports';
import SColorChooser from '../ui/SColorChooser.vue';
import ControlPanelHeader from './ControlPanelHeader.vue';
import ControlPanelSection from './ControlPanelSection.vue';

import { useCanvasStore } from '../../stores/canvas.store';

const canvasStore = useCanvasStore();

const { canvasWidth, canvasHeight } = storeToRefs(canvasStore);

const backgroundType = ref('gradient');
const backgroundTypes = ref([
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid', label: 'Solid' },
  { value: 'transparent', label: 'Transparent' },
]);
const gradientStart = ref('#8B5CF6');
const gradientEnd = ref('#EC4899');
const solidColor = ref('#F3F4F6');

const shadowEnabled = ref(false);
const shadowIntensity = ref(50);

const cornerRadius = ref(12);

const selectedCanvasSize = ref('twitter');
const canvasSizes = [
  'twitter',
  'instagram',
  'facebook',
  'open-graph',
  'custom',
];
</script>
