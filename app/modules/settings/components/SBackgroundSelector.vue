<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>

<template>
  <UPopover>
    <div class="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md p-2">
      <div
        class="h-4 w-full rounded-sm"
        :style="{ backgroundColor: model }"
      />
    </div>

    <template #content>
      <UInput v-model="model" />
    </template>
  </UPopover>
</template>
