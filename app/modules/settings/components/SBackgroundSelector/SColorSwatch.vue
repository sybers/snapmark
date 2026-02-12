<script setup lang="ts">
defineProps<{
  backgroundStyle: string;
  isSelected: boolean;
}>();

defineEmits<{
  (e: 'select'): void;
}>();
</script>

<template>
  <button
    class="flex items-center justify-center"
    @keydown.enter="$emit('select')"
  >
    <span
      class="block w-full aspect-square rounded-md border relative overflow-hidden"
      :class="{
        'border-neutral-300 dark:border-neutral-700': !isSelected,
        'border-primary': isSelected,
      }"
      :style="{ background: backgroundStyle }"
      @click="$emit('select')"
    >
      <Transition name="slide-up">
        <span
          v-if="isSelected"
          class="size-2 rounded-full bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Transition>
    </span>
  </button>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform .3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(400%);
}
</style>
