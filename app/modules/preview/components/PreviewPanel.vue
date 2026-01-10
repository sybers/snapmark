<template>
  <div class="lg:h-full flex flex-col p-4 lg:pr-0">
    <div class="flex-1 bg-neutral-200 dark:bg-neutral-950 p-6 flex flex-col min-h-[50vh] lg:min-h-0 border border-neutral-300 dark:border-neutral-800 rounded-lg">
      <div class="flex-1 min-h-0 relative">
        <PreviewContent class="absolute inset-0 overflow-hidden" />
      </div>
    </div>

    <PreviewPanelStatusBar class="shrink-0 pt-4" />
  </div>
</template>

<script setup lang="ts">
import PreviewContent from './PreviewContent.vue';
import PreviewPanelStatusBar from './PreviewPanelStatusBar/PreviewPanelStatusBar.vue';
</script>
