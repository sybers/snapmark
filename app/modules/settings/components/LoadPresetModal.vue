<script setup lang="ts">
import { useOverlay, useI18n } from '#imports';
import { usePresetsStore } from '~/modules/shared/stores/presets.store';
import PresetPreviewCard from './PresetPreviewCard.vue';
import SavePresetModal from './SavePresetModal.vue';

const presetsStore = usePresetsStore();

const { t } = useI18n();
const overlay = useOverlay();

const emit = defineEmits<{
  close: [{ success: boolean }];
  openSaveModal: [];
}>();

function loadPreset(name: string) {
  presetsStore.loadPreset(name);
  emit('close', { success: true });
}

function deletePreset(name: string) {
  presetsStore.deletePreset(name);
}

function closeModal() {
  emit('close', { success: false });
}

async function openSavePresetModal() {
  const saveModal = overlay.create(SavePresetModal);
  await saveModal.open();
}
</script>

<template>
  <UModal
    :close="{ onClick: closeModal }"
    :ui="{ content: 'w-[calc(100vw-2rem)] max-w-3xl h-[calc(100vh-6rem)]' }"
    :title="t('presets.loadTitle')"
  >
    <template #content>
      <div class="flex flex-col gap-4 p-4 h-full min-h-0">
        <div class="flex-1 min-h-0 overflow-y-auto">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              class="aspect-square rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              @click="openSavePresetModal"
            >
              <UIcon
                name="i-heroicons-plus"
                class="w-8 h-8"
              />
              <span class="text-sm font-medium px-4 text-center">
                {{ t('presets.saveCurrentSettings') }}
              </span>
            </button>

            <PresetPreviewCard
              v-for="preset in presetsStore.presets"
              :key="preset.name"
              :preset="preset"
              @load="loadPreset(preset.name)"
              @delete="deletePreset(preset.name)"
            />
          </div>
        </div>

        <div class="flex justify-end shrink-0">
          <UButton
            color="neutral"
            variant="outline"
            :label="t('presets.cancel')"
            @click="closeModal"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
