<template>
  <component
    :is="frameComponent"
    :roundness="roundness"
    :scale="scale"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FrameSettings } from '~/modules/shared/types';

import FrameNone from '~/modules/preview/components/Frames/FrameNone.vue';
import FrameArc from '~/modules/preview/components/Frames/FrameArc.vue';
import FrameMacos from '~/modules/preview/components/Frames/FrameMacos.vue';
import FrameWindows from '~/modules/preview/components/Frames/FrameWindows.vue';

const props = withDefaults(defineProps<{
  frame: FrameSettings;
  roundness: number;
  scale?: number;
}>(), {
  scale: 1,
});

const frameComponents: Record<string, typeof FrameNone> = {
  none: FrameNone,
  arc: FrameArc,
  macos: FrameMacos,
  windows: FrameWindows,
};

const frameComponent = computed(() => {
  return frameComponents[props.frame.frameName] || FrameNone;
});
</script>
