<script setup lang="ts">
import { useOverlay, useI18n } from '#imports';
import { ref, watch } from 'vue';

import SettingsPanelSection from './SettingsPanelSection.vue';
import SBackgroundSelector from './SBackgroundSelector';
import SXYControl from './SXYControl.vue';
import SettingsItem from './SettingsItem.vue';
import SavePresetModal from './SavePresetModal.vue';
import LoadPresetModal from './LoadPresetModal.vue';
import CanvasSizePresetsPopover from './CanvasSizePresetsPopover.vue';

import { useFrameSettings } from '~/modules/shared/composables/useFrameSettings';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';

const overlay = useOverlay();
const { t } = useI18n();

const { frameName, availableFrames } = useFrameSettings();

const {
  screenshotScale,
  screenshotRoundness,
  screenshotPerspective,
  screenshotRotation,
  screenshotOffset,
  screenshotBoxShadow,
  screenshotBoxShadowOptions,
} = useScreenshotSettings();

const {
  backgroundStyle,
  backgroundOpacity,
  backgroundRoundness,
  backgroundNoise,
} = useBackgroundSettings();

const { canvasWidth, canvasHeight } = useCanvasSettings();

const selectedBoxShadowIndex = ref(screenshotBoxShadowOptions.indexOf(screenshotBoxShadow.value));
watch(selectedBoxShadowIndex, (index) => {
  screenshotBoxShadow.value = screenshotBoxShadowOptions[index] as string;
}, { immediate: true });

async function openSavePresetModal() {
  const saveModal = overlay.create(SavePresetModal);
  await saveModal.open();
}

async function openLoadPresetModal() {
  const loadPresetModal = overlay.create(LoadPresetModal, {
    props: {
      onOpenSaveModal: openSavePresetModal,
    },
  });
  await loadPresetModal.open();
}
</script>

<template>
  <div class="w-full h-full lg:max-w-xs p-4 bg-white dark:bg-neutral-900 overflow-y-auto">
    <SettingsPanelSection :title="t('screenshot.title')">
      <SettingsItem :label="t('ui.frame')">
        <USelect
          v-model="frameName"
          class="w-full"
          :items="availableFrames"
        />
      </SettingsItem>

      <SettingsItem :label="t('ui.scale')">
        <USlider
          v-model="screenshotScale"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="150"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ screenshotScale }}
        </div>
      </SettingsItem>

      <SettingsItem :label="t('screenshot.shadow')">
        <USlider
          v-model="selectedBoxShadowIndex"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="screenshotBoxShadowOptions.length - 1"
        />
        <div class="text-xs text-neutral-500 text-right mt-1">
          {{ selectedBoxShadowIndex }}
        </div>
      </SettingsItem>

      <SettingsItem :label="t('ui.roundness')">
        <USlider
          v-model="screenshotRoundness"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="48"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ screenshotRoundness }}px
        </div>
      </SettingsItem>

      <SettingsItem :label="t('ui.perspective')">
        <SXYControl
          v-model="screenshotPerspective"
          icon="i-heroicons-cube-transparent"
          :min="-10"
          :max="10"
        >
          <template #label="{ x, y }">
            <span class="tabular-nums">{{ x.toFixed(1) }}° / {{ y.toFixed(1) }}°</span>
          </template>
        </SXYControl>
      </SettingsItem>

      <SettingsItem :label="t('ui.rotation')">
        <USlider
          v-model="screenshotRotation"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="-180"
          :max="180"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ screenshotRotation }}deg
        </div>
      </SettingsItem>

      <SettingsItem :label="t('ui.offset')">
        <SXYControl
          v-model="screenshotOffset"
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

    <SettingsPanelSection :title="t('background.title')">
      <SettingsItem :label="t('ui.color')">
        <SBackgroundSelector v-model="backgroundStyle" />
      </SettingsItem>

      <SettingsItem :label="t('ui.opacity')">
        <USlider
          v-model="backgroundOpacity"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="100"
        />
      </SettingsItem>

      <SettingsItem :label="t('ui.roundness')">
        <USlider
          v-model="backgroundRoundness"
          class="mt-2"
          size="xs"
          color="neutral"
          :min="0"
          :max="48"
          :step="1"
        />
        <div class="text-xs text-neutral-500 text-right">
          {{ backgroundRoundness }}px
        </div>
      </SettingsItem>
      <SettingsItem :label="t('background.noise')">
        <USwitch v-model="backgroundNoise" />
      </SettingsItem>
    </SettingsPanelSection>

    <SettingsPanelSection :title="t('canvas.title')">
      <SettingsItem :label="t('ui.width')">
        <UInput
          v-model="canvasWidth"
          type="number"
          :placeholder="t('ui.width')"
        >
          <template #trailing>
            <span class="text-xs text-neutral-400">px</span>
          </template>
        </UInput>
      </SettingsItem>

      <SettingsItem :label="t('ui.height')">
        <UInput
          v-model="canvasHeight"
          type="number"
          :placeholder="t('ui.height')"
        >
          <template #trailing>
            <span class="text-xs text-neutral-400">px</span>
          </template>
        </UInput>
      </SettingsItem>

      <UPopover
        :ui="{ content: 'p-0' }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          icon="i-heroicons-photo"
          color="neutral"
          variant="outline"
          block
        >
          {{ t('canvas.socialPresets.title') }}
        </UButton>

        <template #content="{ close }">
          <CanvasSizePresetsPopover @close="close" />
        </template>
      </UPopover>
    </SettingsPanelSection>

    <SettingsPanelSection
      :title="t('presets.title')"
      no-border
    >
      <div class="grid grid-cols-2 gap-2">
        <UButton
          color="neutral"
          variant="outline"
          block
          @click="openSavePresetModal"
        >
          <UIcon
            name="i-heroicons-bookmark"
            class="w-4 h-4 mr-2"
          />
          {{ t('ui.save') }}
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
          @click="openLoadPresetModal"
        >
          <UIcon
            name="i-heroicons-folder-open"
            class="w-4 h-4 mr-2"
          />
          {{ t('ui.load') }}
        </UButton>
      </div>
    </SettingsPanelSection>
  </div>
</template>
