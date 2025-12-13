<template>
  <UApp>
    <UMain>
      <ClientOnlyTransition
        name="fade"
        mode="out-in"
      >
        <div class="h-screen lg:flex">
          <PreviewPanel class="grow" />
          <SettingsPanel />
        </div>

        <template #fallback>
          <LoadingFallback />
        </template>
      </ClientOnlyTransition>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import { usePresetsStore } from '~/modules/shared/stores/presets.store';
import ClientOnlyTransition from '~/modules/shared/components/ClientOnlyTransition.vue';
import LoadingFallback from '~/modules/shared/components/LoadingFallback.vue';
import PreviewPanel from '~/modules/preview/PreviewPanel.vue';
import SettingsPanel from '~/modules/settings/SettingsPanel.vue';

const presetsStore = usePresetsStore();

presetsStore.loadDefaultPreset();
</script>
