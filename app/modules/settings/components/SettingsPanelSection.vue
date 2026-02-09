<template>
  <div class="py-2 mb-4">
    <div class="flex items-center justify-between">
      <span
        v-if="title"
        class="text-xs text-neutral-400 font-semibold mb-2 uppercase"
      >{{ title }}</span>

      <slot name="title-right" />
    </div>

    <div class="flex flex-col gap-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>
