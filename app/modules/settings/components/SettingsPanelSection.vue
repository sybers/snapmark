<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="py-2">
    <div class="flex items-center justify-between">
      <span
        v-if="title"
        class="text-xs text-neutral-400 font-semibold mb-2 uppercase"
      >{{ title }}</span>

      <slot name="title-right" />
    </div>

    <div class="flex flex-col gap-3">
      <slot />
    </div>
  </div>
</template>
