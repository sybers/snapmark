<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef, watch } from 'vue';

export type Tab = {
  label: string;
  value: string;
};

const props = withDefaults(defineProps<{
  tabs?: Tab[];
}>(), {
  tabs: () => [],
});

const model = defineModel<string>({
  required: true,
});

const activeTabIndex = computed(() => {
  const index = props.tabs.findIndex((tab) => tab.value === model.value);
  if (index < 0 || index >= props.tabs.length) {
    return undefined;
  }

  return index;
});

function setSelectedTab(tab: Tab['value']) {
  model.value = tab;
}

const tabRefs = useTemplateRef('tabRefs');
const gliderPosition = shallowRef<{ left: number; width: number } | undefined>(undefined);

function updateGliderPosition() {
  if (activeTabIndex.value === undefined) {
    return;
  }

  const tabRef = tabRefs.value?.[activeTabIndex.value];
  if (!tabRef) {
    return;
  }

  gliderPosition.value = {
    left: tabRef.offsetLeft ?? 0,
    width: tabRef.offsetWidth ?? 0,
  };
}

watch(activeTabIndex, () => {
  updateGliderPosition();
});

onMounted(() => {
  updateGliderPosition();
});
</script>

<template>
  <div class="relative flex w-full gap-1 p-1 bg-neutral-100 dark:bg-black rounded-2xl">
    <div
      v-if="gliderPosition"
      class="absolute left-1 top-1 bottom-1 rounded-xl bg-neutral-200 dark:bg-neutral-700 transition-all duration-300"
      :style="{ left: `${gliderPosition.left}px`, width: `${gliderPosition.width}px` }"
    />
    <div
      v-for="tab in tabs"
      ref="tabRefs"
      :key="tab.value"
      class="flex-1 p-1 rounded-xl transition-colors duration-300 cursor-pointer text-sm font-medium text-center z-1 focus-visible:outline-2"
      tabindex="0"
      @click="setSelectedTab(tab.value)"
      @keydown.enter="setSelectedTab(tab.value)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>
