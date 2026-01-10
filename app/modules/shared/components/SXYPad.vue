<template>
  <div
    ref="padRef"
    class="relative cursor-crosshair overflow-hidden select-none touch-none bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900"
    :style="{ width: `${size}px`, height: `${size}px` }"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <!-- Grid lines -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-neutral-300 dark:bg-neutral-700" />
      <div class="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-700" />
    </div>

    <!-- Handle -->
    <div
      class="absolute size-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
      :style="handleStyle"
    >
      <div
        class="size-full bg-snapmark-500 rounded-full shadow-[0_2px_8px_rgba(0,98,255,0.4),0_0_0_3px_rgba(0,98,255,0.15)] transition-transform duration-100"
        :class="{ 'scale-110': isDragging }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePointer } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  min?: number;
  max?: number;
  size?: number;
}>(), {
  min: -10,
  max: 10,
  size: 180,
});

const model = defineModel<{ x: number; y: number }>({ required: true });

const padRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const { x: pointerX, y: pointerY, pressure } = usePointer();

const handleStyle = computed(() => {
  const range = props.max - props.min;
  const xPercent = ((model.value.x - props.min) / range) * 100;
  const yPercent = ((model.value.y - props.min) / range) * 100;

  return {
    left: `${yPercent}%`,
    top: `${xPercent}%`,
  };
});

function updateFromPointer() {
  if (!padRef.value || !isDragging.value) return;

  const rect = padRef.value.getBoundingClientRect();
  const range = props.max - props.min;

  const xPercent = Math.max(0, Math.min(1, (pointerX.value - rect.left) / rect.width));
  const yPercent = Math.max(0, Math.min(1, (pointerY.value - rect.top) / rect.height));

  model.value = {
    x: Math.round((props.min + yPercent * range) * 100) / 100,
    y: Math.round((props.min + xPercent * range) * 100) / 100,
  };
}

watch([pointerX, pointerY], updateFromPointer);

watch(pressure, (p) => {
  if (p === 0) isDragging.value = false;
});

function onPointerDown(event: PointerEvent) {
  isDragging.value = true;
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
  updateFromPointer();
}

function onPointerUp() {
  isDragging.value = false;
}
</script>
