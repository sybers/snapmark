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
  <SContainer class="w-full h-full lg:max-w-xs">
    <div class="flex flex-col flex-1 min-h-0">
      <STabs
        v-model="activeTab"
        :tabs="tabs"
      />

      <div class="relative flex-1 min-h-0 flex flex-col">
        <div class="scroll-area flex-1 min-h-0 lg:overflow-y-auto py-4">
          <div class="min-h-full">
            <template v-if="activeTab === 'Screenshot'">
              <SettingsPanelScreenshot />
            </template>
            <template v-if="activeTab === 'Background'">
              <SettingsPanelBackground />
              <SettingsPanelCanvas />
              <SettingsPanelCanvas />
              <SettingsPanelCanvas />
            </template>

            <SettingsPanelPresets />
          </div>
        </div>
        <div
          class="absolute left-0 right-0 top-0 h-6 z-1 pointer-events-none bg-linear-to-b from-white via-white/60 to-transparent dark:from-neutral-900 dark:via-neutral-900/60 dark:to-transparent"
          aria-hidden="true"
        />
        <div
          class="absolute left-0 right-0 bottom-0 h-6 z-1 pointer-events-none bg-linear-to-t from-white via-white/60 to-transparent dark:from-neutral-900 dark:via-neutral-900/60 dark:to-transparent"
          aria-hidden="true"
        />
      </div>

      <SettingsPanelFooter />
    </div>
  </SContainer>
</template>

<style scoped>
.scroll-area {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-area::-webkit-scrollbar {
  display: none;
}
</style>
