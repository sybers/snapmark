<script setup lang="ts">
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import SettingsPanelSection from './SettingsPanelSection.vue';
import SBackgroundSelector from './SBackgroundSelector';

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
    <SBackgroundSelector v-model="backgroundStyle" />

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
