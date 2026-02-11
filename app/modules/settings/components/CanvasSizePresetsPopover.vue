<script setup lang="ts">
import { socialMediaCanvasPresets } from './socialMediaCanvasPresets';
import type { CanvasPreset } from './socialMediaCanvasPresets';
import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';

const { t } = useI18n();

const platformId = defineModel<string>('platformId', { required: true });

const emit = defineEmits<{
  close: [];
}>();

const { canvasWidth, canvasHeight } = useCanvasSettings();

const selectedPlatform = computed(() =>
  socialMediaCanvasPresets.find((p) => p.id === platformId.value),
);

function applyPreset(preset: CanvasPreset) {
  canvasWidth.value = preset.width;
  canvasHeight.value = preset.height;
  emit('close');
}

function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;

  return `${ratioW}:${ratioH}`;
}
</script>

<template>
  <div class="flex flex-col h-[450px] w-[620px]">
    <div class="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
      <h3 class="text-lg font-bold">
        {{ t('canvas.socialPresets.title') }}
      </h3>
      <UButton
        icon="heroicons:x-mark-20-solid"
        color="neutral"
        variant="ghost"
        size="sm"
        @click="emit('close')"
      />
    </div>

    <div class="flex flex-1 min-h-0">
      <div class="w-40 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto">
        <button
          v-for="platform in socialMediaCanvasPresets"
          :key="platform.id"
          class="w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
          :class="{
            'bg-neutral-100 dark:bg-neutral-800 font-medium': platformId === platform.id,
          }"
          @click="platformId = platform.id"
        >
          <UIcon
            :name="platform.icon"
            class="w-4 h-4 shrink-0"
          />
          <span class="truncate">{{ t(platform.labelKey) }}</span>
        </button>
      </div>

      <div class="flex-1 p-4 overflow-y-auto">
        <div
          v-if="selectedPlatform"
          class="grid grid-cols-2 gap-2"
        >
          <button
            v-for="preset in selectedPlatform.presets"
            :key="preset.id"
            class="w-full px-4 py-3 text-left rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            @click="applyPreset(preset)"
          >
            <span class="text-sm font-medium">{{ t(preset.labelKey) }}</span>
            <div class="flex items-center justify-between">
              <span class="text-xs text-neutral-500 tabular-nums">{{ preset.width }} × {{ preset.height }}</span>
              <span class="text-xs text-neutral-500 tabular-nums">{{ getAspectRatio(preset.width, preset.height) }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
