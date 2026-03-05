<script setup lang="ts">
import SScrollFade from '~/modules/shared/components/SScrollFade.vue';
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
  <SContainer class="w-full h-full lg:max-w-xs">
    <div class="flex flex-col flex-1 min-h-0">
      <STabs
        v-model="activeTab"
        :tabs="tabs"
      />

      <SScrollFade scroll-class="lg:overflow-y-auto">
        <div class="min-h-full py-4">
          <template v-if="activeTab === 'Screenshot'">
            <SettingsPanelScreenshot />
          </template>
          <template v-if="activeTab === 'Background'">
            <SettingsPanelBackground />
            <SettingsPanelCanvas />
          </template>

          <SettingsPanelPresets />
        </div>
      </SScrollFade>

      <SettingsPanelFooter />
    </div>
  </SContainer>
</template>
