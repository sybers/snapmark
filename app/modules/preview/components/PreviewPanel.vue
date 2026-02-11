<script setup lang="ts">
import PreviewContent from './PreviewContent.vue';
import PreviewPanelStatusBar from './PreviewPanelStatusBar/PreviewPanelStatusBar.vue';
</script>

<template>
  <div class="lg:h-full flex flex-col lg:pr-0">
    <div class="flex-1 p-6 flex flex-col min-h-[50vh] lg:min-h-0">
      <div class="flex-1 min-h-0 relative">
        <PreviewContent class="absolute inset-0 overflow-hidden" />
      </div>
    </div>

    <PreviewPanelStatusBar class="shrink-0" />
  </div>
</template>
