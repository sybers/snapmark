<script setup lang="ts">
import SettingsPanelScreenshot from './SettingsPanelScreenshot.vue';
import SettingsPanelBackground from './SettingsPanelBackground.vue';
import SettingsPanelCanvas from './SettingsPanelCanvas.vue';
import SettingsPanelPresets from './SettingsPanelPresets.vue';
import SettingsPanelFooter from './SettingsPanelFooter.vue';
import SContainer from '../../shared/components/SContainer.vue';
</script>

<template>
  <SContainer class="w-full h-full lg:max-w-xs">
    <div class="flex flex-col h-full overflow-y-auto">
      <SettingsPanelScreenshot />
      <SettingsPanelBackground />
      <SettingsPanelCanvas />
      <SettingsPanelPresets />
      <SettingsPanelFooter />
    </div>
  </SContainer>
</template>
