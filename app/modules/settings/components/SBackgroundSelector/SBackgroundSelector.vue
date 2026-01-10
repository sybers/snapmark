<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from '#imports';
import { useBackgroundSettings } from '~/modules/shared/composables/useBackgroundSettings';
import SBackgroundSelectorGradient from './SBackgroundSelectorGradient.vue';
import SBackgroundSelectorSolid from './SBackgroundSelectorSolid.vue';
import type { BackgroundStyle, BackgroundType } from '~/modules/shared/types';

const { t } = useI18n();

const { getBackgroundStyleAsCss } = useBackgroundSettings();

const model = defineModel<BackgroundStyle>({ required: true });
const modelAsCssStyle = computed(() => getBackgroundStyleAsCss(model.value));

const backgroundTypeOptions = computed<{ label: string; value: BackgroundType }[]>(() => [
  { label: t('ui.gradient'), value: 'gradient' },
  { label: t('ui.solid'), value: 'solid' },
]);

const backgroundType = ref<BackgroundType>(model.value.type);
</script>

<template>
  <UPopover
    :content="{ side: 'bottom', align: 'center' }"
    :ui="{ content: 'w-[320px]' }"
  >
    <div class="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md p-2">
      <div
        class="h-4 w-full rounded-sm"
        :style="{ background: modelAsCssStyle }"
      />
    </div>

    <template #content="{ close }">
      <div class="p-6 space-y-6">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center gap-2">
            <label class="text-lg font-bold">{{ $t('ui.color') }}</label>
            <UButton
              icon="heroicons:x-mark-20-solid"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </div>
          <URadioGroup
            v-model="backgroundType"
            orientation="horizontal"
            variant="table"
            indicator="hidden"
            size="sm"
            :items="backgroundTypeOptions"
            :ui="{ item: 'grow' }"
          />
        </div>

        <SBackgroundSelectorGradient
          v-if="backgroundType === 'gradient'"
          v-model="model"
        />
        <SBackgroundSelectorSolid
          v-else-if="backgroundType === 'solid'"
          v-model="model"
        />
      </div>
    </template>
  </UPopover>
</template>
