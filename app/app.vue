<template>
  <UApp>
    <UMain>
      <ClientOnly>
        <div class="h-screen lg:flex">
          <PreviewPanel
            class="grow"
            :canvas-width="canvasWidth"
            :canvas-height="canvasHeight"
          />

          <SettingsPanel
            :canvas-width="canvasWidth"
            :canvas-height="canvasHeight"
          />
        </div>

        <template #fallback>
          Loading...
        </template>
      </ClientOnly>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PreviewPanel from './modules/preview/PreviewPanel.vue';
import SettingsPanel from './modules/settings/SettingsPanel.vue';

const canvasWidth = ref(1200);
const canvasHeight = ref(630);
</script>
