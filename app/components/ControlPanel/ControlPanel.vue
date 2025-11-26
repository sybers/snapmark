<template>
  <div class="w-full h-full lg:w-1/3 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
    <div class="space-y-2">
      <ControlPanelHeader />

      <USeparator
        class="mb-2"
        size="md"
      />

      <ControlPanelSection title="Frame">
        <USelectMenu
          v-model="selectedFrame"
          :options="frameOptions"
          placeholder="Select a frame"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-computer-desktop"
              class="w-4 h-4"
            />
          </template>
        </USelectMenu>
      </ControlPanelSection>

      <USeparator
        class="mb-2"
        size="md"
      />

      <ControlPanelSection title="Background">
        <div>
          <label class="text-xs text-gray-500 mb-2 block">Type</label>
          <URadioGroup
            v-model="backgroundType"
            :options="backgroundTypes"
          />
        </div>

        <div v-if="backgroundType === 'gradient'">
          <label class="text-xs text-gray-500 mb-2 block">Gradient Colors</label>
          <div class="flex gap-2">
            <UColorPicker v-model="gradientStart" />
            <UColorPicker v-model="gradientEnd" />
          </div>
        </div>

        <div v-if="backgroundType === 'solid'">
          <label class="text-xs text-gray-500 mb-2 block">Color</label>
          <UColorPicker v-model="solidColor" />
        </div>
      </ControlPanelSection>

      <USeparator
        class="mb-2"
        size="md"
      />

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
          <div class="text-xs text-gray-500 text-right mt-1">
            {{ shadowIntensity }}%
          </div>
        </div>
      </ControlPanelSection>

      <USeparator
        class="mb-2"
        size="md"
      />

      <ControlPanelSection title="Padding">
        <USlider
          v-model="padding"
          :min="0"
          :max="200"
        />
        <div class="text-xs text-gray-500 text-right">
          {{ padding }}px
        </div>
      </ControlPanelSection>

      <USeparator
        class="mb-2"
        size="md"
      />

      <ControlPanelSection title="Corner Radius">
        <USlider
          id="corner-radius"
          v-model="cornerRadius"
          :min="0"
          :max="50"
        />
        <div class="text-xs text-gray-500 text-right">
          {{ cornerRadius }}px
        </div>
      </ControlPanelSection>

      <USeparator
        class="mb-2"
        size="md"
      />

      <ControlPanelSection title="Canvas Size">
        <USelectMenu
          v-model="selectedCanvasSize"
          :options="canvasSizes"
          placeholder="Select preset"
        />

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-500 mb-2 block">Width</label>
            <UInput
              :value="canvasWidth"
              type="number"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-2 block">Height</label>
            <UInput
              :value="canvasHeight"
              type="number"
            />
          </div>
        </div>
      </ControlPanelSection>

      <USeparator
        class="mb-2"
        size="md"
      />

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ControlPanelHeader from './ControlPanelHeader.vue';
import ControlPanelSection from './ControlPanelSection.vue';

defineProps<{
  canvasWidth: number;
  canvasHeight: number;
}>();

const selectedFrame = ref('browser');
const frameOptions = ['browser', 'macOS', 'windows', 'mobile', 'none'];

const backgroundType = ref('gradient');
const backgroundTypes = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid', label: 'Solid' },
  { value: 'transparent', label: 'Transparent' },
];
const gradientStart = ref('#8B5CF6');
const gradientEnd = ref('#EC4899');
const solidColor = ref('#F3F4F6');

const shadowEnabled = ref(true);
const shadowIntensity = ref(50);

const padding = ref(64);

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
