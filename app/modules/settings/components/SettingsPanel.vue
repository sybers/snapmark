<script setup lang="ts">
import { useOverlay, useI18n } from '#imports';
import { ref, watch } from 'vue';

import SettingsPanelSection from './SettingsPanelSection.vue';
import SBackgroundSelector from './SBackgroundSelector';
import SXYControl from './SXYControl.vue';
import SettingsItem from './SettingsItem.vue';
import SavePresetModal from './SavePresetModal.vue';
import LoadPresetModal from './LoadPresetModal.vue';
import LocaleSwitcher from '@/modules/app/components/LocaleSwitcher.vue';
import CanvasSizePresetsPopover from './CanvasSizePresetsPopover.vue';

import { useFrameSettings } from '~/modules/shared/composables/useFrameSettings';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';
import SContainer from '../../shared/components/SContainer.vue';
import SSlider from '../../shared/components/SSlider.vue';

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
  backgroundNoiseOpacity,
} = useBackgroundSettings();

const { canvasWidth, canvasHeight } = useCanvasSettings();

const selectedPlatformId = ref('instagram');

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
  <SContainer class="w-full h-full lg:max-w-xs">
    <div class="flex flex-col h-full overflow-y-auto">
      <SettingsPanelSection :title="t('screenshot.title')">
        <SettingsItem :label="t('ui.frame')">
          <USelect
            v-model="frameName"
            class="w-full"
            :items="availableFrames"
          />
        </SettingsItem>

        <SSlider
          v-model="screenshotScale"
          :label="t('ui.scale')"
          :min="0"
          :max="150"
          :step="1"
          :default-value="65"
        />

        <SSlider
          v-model="selectedBoxShadowIndex"
          :label="t('screenshot.shadow')"
          :min="0"
          :max="screenshotBoxShadowOptions.length - 1"
          :default-value="4"
        />

        <SSlider
          v-model="screenshotRoundness"
          :label="t('ui.roundness')"
          :min="0"
          :max="48"
          :step="1"
          suffix="px"
        />

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

        <SSlider
          v-model="screenshotRotation"
          :label="t('ui.rotation')"
          :min="-180"
          :max="180"
          :step="1"
          :default-value="0"
          suffix="deg"
        />

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

        <SSlider
          v-model="backgroundOpacity"
          :label="t('ui.opacity')"
          :min="0"
          :max="100"
          :default-value="100"
        />

        <SSlider
          v-model="backgroundRoundness"
          :label="t('ui.roundness')"
          :min="0"
          :max="48"
          :step="1"
          suffix="px"
        />

        <SettingsItem :label="t('background.noise')">
          <USwitch v-model="backgroundNoise" />
        </SettingsItem>

        <SSlider
          v-model="backgroundNoiseOpacity"
          :label="t('background.noiseOpacity')"
          :min="0"
          :max="100"
          :default-value="35"
          :step="1"
        />
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
            <CanvasSizePresetsPopover
              v-model:platform-id="selectedPlatformId"
              @close="close"
            />
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

      <div class="grow" />

      <div class="flex items-center justify-center gap-3">
        <LocaleSwitcher />

        <UColorModeButton />

        <UTooltip
          :text="t('header.viewOnGitHub')"
          :delay-duration="50"
        >
          <UButton
            icon="i-simple-icons-github"
            :aria-label="t('header.viewOnGitHub')"
            color="neutral"
            variant="ghost"
            trailing
            external
            to="https://github.com/sybers/snapmark"
            target="_blank"
          />
        </UTooltip>
      </div>

      <div class="flex justify-center mt-4">
        <span class="text-xs text-neutral-400">
          made with <span class="text-red-500">❤</span> by
          <a
            href="https://github.com/sybers"
            class="underline hover:text-neutral-600 dark:hover:text-neutral-300"
            target="_blank"
            rel="noopener noreferrer"
          >sybers</a>
        </span>
      </div>
    </div>
  </SContainer>
</template>
