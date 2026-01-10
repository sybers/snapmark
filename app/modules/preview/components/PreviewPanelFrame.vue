<template>
  <component :is="frameComponent">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFrameStore } from '~/modules/shared/stores/frame.store';

import FrameNone from './Frames/FrameNone.vue';
import { computed, defineAsyncComponent } from 'vue';

const frameStore = useFrameStore();

const { frameName } = storeToRefs(frameStore);

const frameComponent = computed(() => {
  if (!frameName.value) return FrameNone;
  return defineAsyncComponent(() => import(`./Frames/Frame${capitalize(frameName.value)}.vue`));
});

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>
