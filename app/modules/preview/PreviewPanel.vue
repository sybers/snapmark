<template>
  <div class="flex flex-col p-4 lg:pr-0">
    <div class="flex-1 bg-neutral-200 dark:bg-neutral-950 p-6 flex flex-col min-h-[50vh] border border-neutral-300 dark:border-neutral-800 rounded-lg">
      <div class="flex-1 min-h-0 relative">
        <PreviewContent class="absolute inset-0 overflow-hidden" />
      </div>
    </div>

    <PreviewPanelStatusBar class="shrink-0 pt-4" />
  </div>
</template>

<script setup lang="ts">
import PreviewContent from './components/PreviewContent.vue';
import PreviewPanelStatusBar from './components/PreviewPanelStatusBar/PreviewPanelStatusBar.vue';
</script>
