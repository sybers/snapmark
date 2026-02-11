<script setup lang="ts">
import AppHeader from '~/modules/app/components/AppHeader.vue';
import LoadingFallback from '~/modules/app/components/LoadingFallback.vue';
import PreviewPanel from '~/modules/preview/components/PreviewPanel.vue';
import SettingsPanel from '~/modules/settings/components/SettingsPanel.vue';
import { useAppStore } from '~/stores/app.store';

const appConfig = useAppConfig();
const appStore = useAppStore();

const clientOnlyContainer = useTemplateRef('clientOnlyContainer');
watch(clientOnlyContainer, () => {
  appStore.isReady = true;
}, { once: true });
</script>

<template>
  <UApp
    class="relative"
    :toaster="appConfig.toaster"
  >
    <UMain>
      <div class="h-screen flex flex-col bg-neutral-200 dark:bg-neutral-950">
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
        <LoadingFallback
          v-if="!appStore.isReady"
          class="z-50"
        />
      </Transition>
    </UMain>
  </UApp>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
  transition-delay: 200ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
