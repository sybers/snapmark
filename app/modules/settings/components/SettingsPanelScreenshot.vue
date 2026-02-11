<script setup lang="ts">
import { useI18n } from '#imports';
import { ref, watch } from 'vue';

import SettingsPanelSection from './SettingsPanelSection.vue';
import SXYControl from './SXYControl.vue';
import SettingsItem from './SettingsItem.vue';

import { useFrameSettings } from '~/modules/shared/composables/useFrameSettings';
import { useScreenshotSettings } from '~/modules/shared/composables/useScreenshotSettings';
import SSlider from '../../shared/components/SSlider.vue';

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

const selectedBoxShadowIndex = ref(screenshotBoxShadowOptions.indexOf(screenshotBoxShadow.value));
watch(selectedBoxShadowIndex, (index) => {
  screenshotBoxShadow.value = screenshotBoxShadowOptions[index] as string;
}, { immediate: true });
</script>

<template>
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
</template>
