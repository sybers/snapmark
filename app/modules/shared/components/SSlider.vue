<template>
  <div
    class="sslider relative flex items-center overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-600"
    @dblclick="resetToDefault"
  >
    <div
      ref="trackRef"
      class="relative w-full h-8 flex items-center cursor-pointer select-none touch-none z-0"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @lostpointercapture="onPointerUp"
    >
      <div
        class="absolute left-0 top-0 bottom-0 bg-neutral-100 dark:bg-neutral-800 transition-colors rounded-l-xl rounded-r-lg"
        :style="{ width: `${fillPercent}%` }"
      />

      <div
        class="absolute h-4 w-0.5 bg-neutral-400 dark:bg-neutral-200 rounded-full pointer-events-none"
        :class="{ 'transition-all duration-75 ease-in-out': isAtMin }"
        :style="mainHandleStyle"
      />

      <div
        class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium tabular-nums text-neutral-600 dark:text-neutral-400"
      >
        <slot
          name="value"
          v-bind="{ value: displayValue }"
        >
          {{ displayValue }}{{ suffix }}
        </slot>
      </div>
    </div>

    <div
      v-if="label"
      class="absolute left-0 top-0 bottom-0 min-w-20 pl-3 pr-2 flex items-center text-neutral-600 dark:text-neutral-300 text-sm font-medium z-10 pointer-events-none"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useElementBounding } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    suffix?: string;
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    suffix: '',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const trackRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const { left: trackLeft, width: trackWidth } = useElementBounding(trackRef);

function updateValueFromPointer(clientX: number) {
  if (trackWidth.value <= 0) return;
  const percent = Math.max(0, Math.min(1, (clientX - trackLeft.value) / trackWidth.value));
  const rawValue = props.min + percent * (props.max - props.min);
  emit('update:modelValue', clampValue(rawValue));
}

const displayValue = computed(() =>
  Number.isInteger(props.modelValue) ? props.modelValue : props.modelValue.toFixed(2),
);

const fillPercent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return Math.max(0, Math.min(100, ((props.modelValue - props.min) / range) * 100));
});

const isAtMin = computed(() => props.modelValue <= props.min);

const mainHandleStyle = computed(() => {
  const left = isAtMin.value ? 5 : fillPercent.value;

  return { left: `${left}%`, transform: 'translateX(-350%)' };
});

function clampValue(value: number): number {
  const range = props.max - props.min;
  const steps = Math.round((value - props.min) / props.step);
  const clampedSteps = Math.max(0, Math.min(Math.floor(range / props.step), steps));
  return Math.round((props.min + clampedSteps * props.step) * 100) / 100;
}

function resetToDefault() {
  emit('update:modelValue', clampValue(props.defaultValue ?? props.min));
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) return;
  isDragging.value = true;
  trackRef.value?.setPointerCapture(event.pointerId);
  updateValueFromPointer(event.clientX);
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value) return;
  updateValueFromPointer(event.clientX);
}

function onPointerUp() {
  isDragging.value = false;
}
</script>
