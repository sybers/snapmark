<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
    <div class="flex flex-col items-center gap-6">
      <div class="relative w-48 flex items-center justify-center">
        <UColorModeImage
          light="/images/icon/snapmark-logotype.svg"
          dark="/images/icon/snapmark-logotype-dark.svg"
          alt="Snapmark Logo"
          class="w-full h-auto object-contain"
        />
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-lg font-medium animate-pulse">
        {{ t('ui.loading') }}…
      </p>
    </div>
  </div>
</template>
