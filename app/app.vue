<template>
  <UApp>
    <UMain>
      <ClientOnly>
        <div class="h-screen lg:flex">
          <PreviewPanel class="grow" />
          <SettingsPanel />
        </div>

        <template #fallback>
          Loading...
        </template>
      </ClientOnly>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import { usePresetsStore } from '~/modules/shared/stores/presets.store';
import PreviewPanel from './modules/preview/PreviewPanel.vue';
import SettingsPanel from './modules/settings/SettingsPanel.vue';

const presetsStore = usePresetsStore();

presetsStore.loadDefaultPreset();
</script>
