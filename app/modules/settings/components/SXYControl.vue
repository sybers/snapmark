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
        :icon="icon"
      >
        <slot
          name="label"
          v-bind="model"
        >
          <span class="tabular-nums">{{ model.x }} / {{ model.y }}</span>
        </slot>
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
      @click="reset"
    />
  </UFieldGroup>
</template>

<script setup lang="ts">
import SXYPad from '~/modules/shared/components/SXYPad.vue';

withDefaults(defineProps<{
  icon?: string;
  min?: number;
  max?: number;
}>(), {
  min: -100,
  max: 100,
});

const model = defineModel<{ x: number; y: number }>({ required: true });

function reset() {
  model.value = { x: 0, y: 0 };
}
</script>
