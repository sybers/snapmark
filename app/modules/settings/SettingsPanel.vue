<template>
  <div class="w-full h-full lg:max-w-xs p-4 bg-white dark:bg-neutral-900 overflow-y-auto">
    <SettingsPanelSection title="Screenshot">
      <SettingsItem label="Shadow">
        <USlider
          v-model="screenshotStore.selectedBoxShadowIndex"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="screenshotStore.boxShadowOptions.length - 1"
        />
        <div class="text-xs text-neutral-500 text-right mt-1">
          {{ screenshotStore.selectedBoxShadowIndex }}
        </div>
      </SettingsItem>

      <SettingsItem label="Roundness">
        <USlider
          v-model="screenshotStore.roundness"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="48"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ screenshotStore.roundness }}px
        </div>
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection title="Background">
      <SettingsItem label="Color">
        <SBackgroundSelector v-model="backgroundStore.backgroundStyle" />
      </SettingsItem>

      <SettingsItem label="Opacity">
        <USlider
          v-model="backgroundStore.opacity"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="100"
        />
      </SettingsItem>

      <SettingsItem label="Roundness">
        <USlider
          v-model="backgroundStore.roundness"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="48"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ backgroundStore.roundness }}px
        </div>
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection title="Canvas Size">
      <SettingsItem label="Width">
        <UInput
          v-model="canvasStore.canvasWidth"
          type="number"
        />
      </SettingsItem>

      <SettingsItem label="Width">
        <UInput
          v-model="canvasStore.canvasHeight"
          type="number"
        />
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection title="Presets">
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
    </SettingsPanelSection>

    <SettingsPanelSection title="Settings">
      <UColorModeSelect />
    </SettingsPanelSection>
  </div>
</template>

<script setup lang="ts">
import SettingsPanelSection from './components/SettingsPanelSection.vue';
import SBackgroundSelector from './components/SBackgroundSelector.vue';
import SettingsItem from './components/SettingsItem.vue';

import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';
import { useBackgroundStore } from '~/modules/shared/stores/background.store';

const canvasStore = useCanvasStore();

const screenshotStore = useScreenshotStore();
const backgroundStore = useBackgroundStore();
</script>
