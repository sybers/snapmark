<script setup lang="ts">
import { onMounted, ref } from 'vue';

const hydrated = ref(false);

onMounted(() => {
  setTimeout(() => {
    hydrated.value = true;
  }, 500);
});
</script>

<template>
  <div class="h-full w-full">
    <div class="client-only-transition">
      <ClientOnly>
        <div :class="['content', hydrated ? 'opacity-100' : 'opacity-0']">
          <slot />
        </div>
      </ClientOnly>
      <div :class="['fallback', hydrated ? 'opacity-0 pointer-events-none' : 'opacity-100']">
        <slot name="fallback" />
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .client-only-transition {
    display: grid;
  }

  .content,
  .fallback {
    grid-area: 1 / 1;
    transition: opacity .4s ease;
  }
  </style>
