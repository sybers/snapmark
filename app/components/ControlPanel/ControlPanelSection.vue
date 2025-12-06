<template>
  <div class="px-4 py-2">
    <div class="flex items-center justify-between">
      <span
        v-if="title"
        class="text-sm font-medium"
      >{{ title }}</span>

      <slot name="title-right" />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>
