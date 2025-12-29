<template>
  <UApp
    class="relative"
    :toaster="appConfig.toaster"
  >
    <UMain>
      <div class="h-screen flex flex-col">
        <AppHeader />

        <ClientOnly>
          <div
            ref="clientOnlyContainer"
            class="h-full lg:flex"
          >
            <PreviewPanel class="grow" />
            <SettingsPanel />
          </div>
        </ClientOnly>
      </div>

      <Transition name="fade">
        <LoadingFallback v-if="!appStore.isReady" />
      </Transition>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import { usePresetsStore } from '~/modules/shared/stores/presets.store';
import AppHeader from '~/modules/shared/components/AppHeader.vue';
import LoadingFallback from '~/modules/shared/components/LoadingFallback.vue';
import PreviewPanel from '~/modules/preview/PreviewPanel.vue';
import SettingsPanel from '~/modules/settings/SettingsPanel.vue';
import { useTemplateRef, watch } from 'vue';
import { useAppStore } from '~/stores/app.store';
import { useAppConfig } from '#app';

const appConfig = useAppConfig();

const presetsStore = usePresetsStore();
const appStore = useAppStore();

presetsStore.loadDefaultPreset();

const clientOnlyContainer = useTemplateRef('clientOnlyContainer');
watch(clientOnlyContainer, () => {
  appStore.isReady = true;
}, { once: true });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
