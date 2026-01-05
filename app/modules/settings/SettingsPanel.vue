<template>
  <div class="w-full h-full lg:max-w-xs p-4 bg-white dark:bg-neutral-900 overflow-y-auto">
    <SettingsPanelSection :title="$t('screenshot.title')">
      <SettingsItem :label="$t('ui.frame')">
        <USelect
          v-model="frameStore.frameName"
          class="w-full"
          :items="frameStore.availableFrames"
        />
      </SettingsItem>

      <SettingsItem :label="$t('ui.scale')">
        <USlider
          v-model="screenshotStore.scale"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="150"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ screenshotStore.scale }}
        </div>
      </SettingsItem>

      <SettingsItem :label="$t('screenshot.shadow')">
        <USlider
          v-model="selectedBoxShadowIndex"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="boxShadowOptions.length - 1"
        />
        <div class="text-xs text-neutral-500 text-right mt-1">
          {{ selectedBoxShadowIndex }}
        </div>
      </SettingsItem>

      <SettingsItem :label="$t('ui.roundness')">
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

      <SettingsItem :label="$t('ui.perspective')">
        <SXYControl
          v-model="screenshotStore.perspective"
          icon="i-heroicons-cube-transparent"
          :min="-10"
          :max="10"
        >
          <template #label="{ x, y }">
            <span class="tabular-nums">{{ x.toFixed(1) }}° / {{ y.toFixed(1) }}°</span>
          </template>
        </SXYControl>
      </SettingsItem>

      <SettingsItem :label="$t('ui.rotation')">
        <USlider
          v-model="screenshotStore.rotation"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="360"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ screenshotStore.rotation }}deg
        </div>
      </SettingsItem>

      <SettingsItem :label="$t('ui.offset')">
        <SXYControl
          v-model="screenshotStore.offset"
          icon="material-symbols-light:drag-pan"
          :min="-50"
          :max="50"
        >
          <template #label="{ x, y }">
            <span class="tabular-nums">{{ x.toFixed(0) }}% / {{ y.toFixed(0) }}%</span>
          </template>
        </SXYControl>
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection :title="$t('background.title')">
      <SettingsItem :label="$t('ui.color')">
        <SBackgroundSelector v-model="backgroundStore.backgroundStyle" />
      </SettingsItem>

      <SettingsItem :label="$t('ui.opacity')">
        <USlider
          v-model="backgroundStore.opacity"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="100"
        />
      </SettingsItem>

      <SettingsItem :label="$t('ui.roundness')">
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
      <SettingsItem :label="$t('background.noise')">
        <USwitch v-model="backgroundStore.noise" />
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection :title="$t('canvas.title')">
      <SettingsItem :label="$t('ui.width')">
        <UInput
          v-model="canvasStore.canvasWidth"
          type="number"
        />
      </SettingsItem>

      <SettingsItem :label="$t('ui.height')">
        <UInput
          v-model="canvasStore.canvasHeight"
          type="number"
        />
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection
      :title="$t('presets.title')"
      no-border
    >
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
          {{ $t('ui.save') }}
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
          {{ $t('ui.load') }}
        </UButton>
      </div>
    </SettingsPanelSection>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import SettingsPanelSection from './components/SettingsPanelSection.vue';
import SBackgroundSelector from './components/SBackgroundSelector.vue';
import SXYControl from './components/SXYControl.vue';
import SettingsItem from './components/SettingsItem.vue';

import { useScreenshotStore } from '~/modules/shared/stores/screenshot.store';
import { useFrameStore } from '~/modules/shared/stores/frame.store';
import { useBackgroundStore } from '~/modules/shared/stores/background.store';
import { useCanvasStore } from '~/modules/shared/stores/canvas.store';

const screenshotStore = useScreenshotStore();
const frameStore = useFrameStore();
const backgroundStore = useBackgroundStore();
const canvasStore = useCanvasStore();

const boxShadowOptions = [
  'none',
  'rgba(0, 0, 0, 0.1) 0px 0px 10px',
  'rgba(0, 0, 0, 0.2) 0px 10px 35px 0px',
  'rgba(0, 0, 0, 0.25) 0px 20px 40px 0px',
  'rgba(0, 0, 0, 0.3) 0px 25px 45px 0px',
  'rgba(0, 0, 0, 0.3) 0px 30px 50px 0px',
  'rgba(0, 0, 0, 0.34) 0px 35px 55px 0px',
  'rgba(0, 0, 0, 0.38) 0px 40px 60px 0px',
  'rgba(0, 0, 0, 0.38) 0px 45px 65px 0px',
  'rgba(0, 0, 0, 0.4) 0px 50px 70px 0px',
  'rgba(0, 0, 0, 0.5) 0px 55px 75px 0px',
];

const selectedBoxShadowIndex = ref(boxShadowOptions.indexOf(screenshotStore.boxShadow));
watch(selectedBoxShadowIndex, (index) => {
  screenshotStore.boxShadow = boxShadowOptions[index] as string;
}, { immediate: true });
</script>
