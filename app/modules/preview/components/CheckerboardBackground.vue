<script setup lang="ts">
import { computed } from 'vue';
import { useColorMode } from '#imports';

const props = withDefaults(defineProps<{
  lightColor?: string;
  darkColor?: string;
  size?: number;
}>(), {
  lightColor: '#c2c2c2',
  darkColor: '#242424',
  size: 20,
});

const colorMode = useColorMode();
const checkerBoardColor = computed(() => colorMode.value === 'dark' ? props.darkColor : props.lightColor);
const checkerBoardSize = computed(() => `${props.size}px`);
</script>

<template>
  <div class="checkerboard">
    <slot />
  </div>
</template>

<style scoped>
.checkerboard {
  background-image: repeating-conic-gradient(v-bind(checkerBoardColor) 0 25%, transparent 0 50%);
  background-size: v-bind(checkerBoardSize) v-bind(checkerBoardSize);
}
</style>
