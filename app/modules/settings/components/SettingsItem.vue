<template>
  <UFormField
    :label="label"
    :ui="{ root: 'grid grid-cols-3 gap-2 items-center', container: 'col-span-2 mt-0' }"
  >
    <slot />
  </UFormField>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
