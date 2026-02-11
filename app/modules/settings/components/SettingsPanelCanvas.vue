<script setup lang="ts">
import { useI18n } from '#imports';
import { ref } from 'vue';

import SettingsPanelSection from './SettingsPanelSection.vue';
import SettingsItem from './SettingsItem.vue';
import CanvasSizePresetsPopover from './CanvasSizePresetsPopover.vue';

import { useCanvasSettings } from '~/modules/shared/composables/useCanvasSettings';

const { t } = useI18n();

const { canvasWidth, canvasHeight } = useCanvasSettings();

const selectedPlatformId = ref('instagram');
</script>

<template>
  <SettingsPanelSection :title="t('canvas.title')">
    <SettingsItem :label="t('ui.width')">
      <UInput
        v-model="canvasWidth"
        type="number"
        :placeholder="t('ui.width')"
      >
        <template #trailing>
          <span class="text-xs text-neutral-400">px</span>
        </template>
      </UInput>
    </SettingsItem>

    <SettingsItem :label="t('ui.height')">
      <UInput
        v-model="canvasHeight"
        type="number"
        :placeholder="t('ui.height')"
      >
        <template #trailing>
          <span class="text-xs text-neutral-400">px</span>
        </template>
      </UInput>
    </SettingsItem>

    <UPopover
      :ui="{ content: 'p-0' }"
      :popper="{ placement: 'bottom-start' }"
    >
      <UButton
        icon="i-heroicons-photo"
        color="neutral"
        variant="outline"
        block
      >
        {{ t('canvas.socialPresets.title') }}
      </UButton>

      <template #content="{ close }">
        <CanvasSizePresetsPopover
          v-model:platform-id="selectedPlatformId"
          @close="close"
        />
      </template>
    </UPopover>
  </SettingsPanelSection>
</template>
