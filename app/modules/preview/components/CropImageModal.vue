<template>
  <UModal
    :close="{ onClick: closeModal }"
    :ui="{ content: 'w-[calc(100vw-2rem)] max-w-2xl' }"
    :title="$t('cropper.title')"
  >
    <template #content>
      <div class="flex flex-col">
        <Cropper
          :src="imageDataURL"
          @ready="handleCropReady"
          @change="handleCropChange"
        />
        <div class="flex p-3 gap-3 justify-center">
          <UButton
            color="neutral"
            variant="outline"
            :label="$t('cropper.actions.cancel')"
            @click="closeModal"
          />
          <UButton
            color="neutral"
            variant="solid"
            :label="$t('cropper.actions.crop')"
            @click="saveCroppedImage"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Cropper, type CropperResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
  imageDataURL: string;
}>();

const emit = defineEmits<{
  close: [{ success: true; croppedDataURL: string } | { success: false }];
}>();

const isCropperReady = ref(false);
const croppedDataURL = ref<string>(props.imageDataURL);

function handleCropReady() {
  isCropperReady.value = true;
}

function handleCropChange({ canvas }: CropperResult) {
  if (!canvas) {
    return;
  }

  croppedDataURL.value = canvas.toDataURL();
}

function saveCroppedImage() {
  emit('close', {
    success: true,
    croppedDataURL: croppedDataURL.value,
  });
}

function closeModal() {
  emit('close', { success: false });
}
</script>
