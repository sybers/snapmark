<script setup lang="ts">
import { useOverlay, useI18n } from '#imports';

import SettingsPanelSection from './SettingsPanelSection.vue';
import SavePresetModal from './SavePresetModal.vue';
import LoadPresetModal from './LoadPresetModal.vue';

const overlay = useOverlay();
const { t } = useI18n();

async function openSavePresetModal() {
  const saveModal = overlay.create(SavePresetModal);
  await saveModal.open();
}

async function openLoadPresetModal() {
  const loadPresetModal = overlay.create(LoadPresetModal, {
    props: {
      onOpenSaveModal: openSavePresetModal,
    },
  });
  await loadPresetModal.open();
}
</script>

<template>
  <SettingsPanelSection :title="t('presets.title')">
    <div class="grid grid-cols-2 gap-2">
      <UButton
        color="neutral"
        variant="outline"
        block
        @click="openSavePresetModal"
      >
        <UIcon
          name="i-heroicons-bookmark"
          class="w-4 h-4 mr-2"
        />
        {{ t('ui.save') }}
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        block
        @click="openLoadPresetModal"
      >
        <UIcon
          name="i-heroicons-folder-open"
          class="w-4 h-4 mr-2"
        />
        {{ t('ui.load') }}
      </UButton>
    </div>
  </SettingsPanelSection>
</template>
