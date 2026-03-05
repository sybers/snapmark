<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Extra classes for the scrollable container (e.g. overflow breakpoints). */
    scrollClass?: string;
    /** Extra classes for the root wrapper. */
    class?: string;
  }>(),
  {
    scrollClass: '',
    class: '',
  },
);
</script>

<template>
  <div
    class="relative flex-1 min-h-0 flex flex-col"
    :class="$props.class"
  >
    <div
      class="scrollbar-hide flex-1 min-h-0 overflow-y-auto"
      :class="scrollClass"
    >
      <slot />
    </div>
    <div
      class="absolute left-0 right-0 top-0 h-6 z-1 pointer-events-none bg-linear-to-b from-white via-white/60 to-transparent dark:from-neutral-900 dark:via-neutral-900/60 dark:to-transparent"
      aria-hidden="true"
    />
    <div
      class="absolute left-0 right-0 bottom-0 h-6 z-1 pointer-events-none bg-linear-to-t from-white via-white/60 to-transparent dark:from-neutral-900 dark:via-neutral-900/60 dark:to-transparent"
      aria-hidden="true"
    />
  </div>
</template>
