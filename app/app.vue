<template>
  <UApp>
    <UMain>
      <ClientOnly>
        <div class="h-screen lg:flex">
          <PreviewPanel
            :canvas-width="canvasWidth"
            :canvas-height="canvasHeight"
          />

          <ControlPanel
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
import PreviewPanel from './components/PreviewPanel/PreviewPanel.vue';
import ControlPanel from './components/ControlPanel/ControlPanel.vue';

const canvasWidth = ref(1200);
const canvasHeight = ref(630);
</script>
