<template>
  <UFieldGroup class="w-full">
    <UPopover
      :ui="{ content: 'p-0' }"
      :popper="{ placement: 'bottom-end' }"
    >
      <UButton
        color="neutral"
        variant="outline"
        size="sm"
        class="w-full justify-start"
        icon="i-heroicons-cube-transparent"
      >
        <span class="tabular-nums">
          {{ model.x.toFixed(1) }}° / {{ model.y.toFixed(1) }}°
        </span>
      </UButton>

      <template #content>
        <SXYPad
          v-model="model"
          :min="min"
          :max="max"
        />
      </template>
    </UPopover>

    <UButton
      icon="i-heroicons-arrow-path"
      color="neutral"
      variant="outline"
      size="sm"
      @click="resetPerspective"
    />
  </UFieldGroup>
</template>

<script setup lang="ts">
import SXYPad from '~/modules/shared/ui/SXYPad.vue';

withDefaults(defineProps<{
  min?: number;
  max?: number;
}>(), {
  min: -10,
  max: 10,
});

const model = defineModel<{ x: number; y: number }>({ required: true });

function resetPerspective() {
  model.value = { x: 0, y: 0 };
}
</script>
