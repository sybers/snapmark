<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
  label: string;
}>();

const model = defineModel<string>({ required: true });

const chipStyles = computed(() => ({ backgroundColor: model.value }));
</script>

<template>
  <UPopover>
    <UButton
      :label="label"
      color="neutral"
      variant="outline"
    >
      <template #leading>
        <span
          :style="chipStyles"
          class="size-3 rounded-full"
        />
      </template>
    </UButton>

    <template #content>
      <UColorPicker
        v-model="model"
        class="p-2"
      />
    </template>
  </UPopover>
</template>
