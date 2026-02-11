<script setup lang="ts">
import { usePresetsStore } from '~/modules/shared/stores/presets.store';
import { useSettingsStore } from '~/modules/shared/stores/settings.store';

const { t } = useI18n();
const presetsStore = usePresetsStore();
const settingsStore = useSettingsStore();

const emit = defineEmits<{
  close: [{ success: true; name: string } | { success: false }];
}>();

const presetName = ref('');
const errorMessage = ref<string | undefined>(undefined);

const canSave = computed(() => presetName.value.trim().length > 0);

function savePreset() {
  const name = presetName.value.trim();

  if (!name) {
    errorMessage.value = t('presets.nameRequired');
    return;
  }

  if (presetsStore.presets.some((p) => p.name === name)) {
    errorMessage.value = t('presets.nameAlreadyExists');
    return;
  }

  presetsStore.savePreset({
    name,
    settings: settingsStore.exportSettings(),
  });

  emit('close', { success: true, name });
}

function closeModal() {
  emit('close', { success: false });
}
</script>

<template>
  <UModal
    :close="{ onClick: closeModal }"
    :ui="{ content: 'w-[calc(100vw-2rem)] max-w-md' }"
    :title="t('presets.saveTitle')"
  >
    <template #content>
      <div class="flex flex-col gap-4 p-4">
        <UFormField
          :label="t('presets.namePlaceholder')"
          :error="errorMessage"
          required
        >
          <UInput
            v-model="presetName"
            :placeholder="t('presets.namePlaceholder')"
            class="w-full"
            autofocus
            @keyup.enter="savePreset"
          />
        </UFormField>

        <div class="flex gap-3 justify-end">
          <UButton
            color="neutral"
            variant="outline"
            :label="t('presets.cancel')"
            @click="closeModal"
          />
          <UButton
            color="neutral"
            variant="solid"
            :label="t('ui.save')"
            :disabled="!canSave"
            @click="savePreset"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
