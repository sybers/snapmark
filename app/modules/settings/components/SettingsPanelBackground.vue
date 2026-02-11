<script setup lang="ts">
import { useI18n } from '#imports';

import SettingsPanelSection from './SettingsPanelSection.vue';
import SBackgroundSelector from './SBackgroundSelector';
import SettingsItem from './SettingsItem.vue';

import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import SSlider from '../../shared/components/SSlider.vue';

const { t } = useI18n();

const {
  backgroundStyle,
  backgroundOpacity,
  backgroundRoundness,
  backgroundNoiseOpacity,
} = useBackgroundSettings();
</script>

<template>
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

    <SSlider
      v-model="backgroundNoiseOpacity"
      :label="t('background.noise')"
      :min="0"
      :max="100"
      :default-value="35"
      :step="1"
    />
  </SettingsPanelSection>
</template>
