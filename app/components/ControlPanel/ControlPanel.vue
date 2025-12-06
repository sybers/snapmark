<template>
  <div class="w-full h-full lg:w-1/4 bg-white dark:bg-neutral-900 overflow-y-auto">
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

    <ControlPanelSection title="Shadow">
      <USlider
        v-model="screenshotStore.selectedBoxShadowIndex"
        :min="0"
        :max="screenshotStore.boxShadowOptions.length - 1"
        color="primary"
      />
      <div class="text-xs text-neutral-500 text-right mt-1">
        {{ screenshotStore.selectedBoxShadowIndex }}
      </div>
    </ControlPanelSection>

    <ControlPanelSection>
      <div class="flex justify-between gap-2">
        <label class="shrink-0 text-xs text-neutral-500 mb-2 block">Corner Radius</label>
        <USlider
          id="corner-radius"
          v-model="screenshotStore.roundness"
          :min="0"
          :max="48"
          :step="1"
        />
      </div>
      <div class="text-xs text-neutral-500 text-right">
        {{ screenshotStore.roundness }}px
      </div>
    </ControlPanelSection>

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
            v-model="canvasStore.canvasWidth"
            type="number"
          />
        </div>
        <div>
          <label class="text-xs text-neutral-500 mb-2 block">Height</label>
          <UInput
            v-model="canvasStore.canvasHeight"
            type="number"
          />
        </div>
      </div>
    </ControlPanelSection>

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

    <ControlPanelSection title="Settings">
      <UColorModeSelect />
    </ControlPanelSection>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SColorChooser from '../ui/SColorChooser.vue';
import ControlPanelSection from './ControlPanelSection.vue';

import { useScreenshotStore } from '~/stores/screenshot.store';
import { useCanvasStore } from '../../stores/canvas.store';

const canvasStore = useCanvasStore();

const screenshotStore = useScreenshotStore();

const backgroundType = ref('gradient');
const backgroundTypes = ref([
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid', label: 'Solid' },
  { value: 'transparent', label: 'Transparent' },
]);
const gradientStart = ref('#8B5CF6');
const gradientEnd = ref('#EC4899');
const solidColor = ref('#F3F4F6');

const selectedCanvasSize = ref('twitter');
const canvasSizes = [
  'twitter',
  'instagram',
  'facebook',
  'open-graph',
  'custom',
];
</script>
