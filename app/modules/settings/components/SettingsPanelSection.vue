<template>
  <div class="py-2">
    <div class="flex items-center justify-between">
      <span
        v-if="title"
        class="text-lg font-bold mb-2"
      >{{ title }}</span>

      <slot name="title-right" />
    </div>

    <div class="flex flex-col gap-2">
      <slot />
    </div>

    <USeparator
      class="mt-4"
      color="neutral"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>
