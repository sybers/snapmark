<script setup lang="ts">
import SettingsPanelScreenshot from './SettingsPanelScreenshot.vue';
import SettingsPanelBackground from './SettingsPanelBackground.vue';
import SettingsPanelCanvas from './SettingsPanelCanvas.vue';
import SettingsPanelPresets from './SettingsPanelPresets.vue';
import SettingsPanelFooter from './SettingsPanelFooter.vue';

const { t } = useI18n();

const tabs = computed(() => [
  { label: t('screenshot.title'), value: 'Screenshot' },
  { label: t('background.title'), value: 'Background' },
]);
const activeTab = ref('Screenshot');
</script>

<template>
  <SContainer class="w-full h-full lg:max-w-xs lg:overflow-y-auto">
    <div class="flex flex-col h-full gap-4">
      <STabs
        v-model="activeTab"
        :tabs="tabs"
      />
      <template v-if="activeTab === 'Screenshot'">
        <SettingsPanelScreenshot />
      </template>
      <template v-if="activeTab === 'Background'">
        <SettingsPanelBackground />
        <SettingsPanelCanvas />
      </template>

      <SettingsPanelPresets />
      <SettingsPanelFooter />
    </div>
  </SContainer>
</template>
