<script setup lang="ts">
import { useI18n } from '#imports';

import LocaleSwitcher from '@/modules/app/components/LocaleSwitcher.vue';

const { t } = useI18n();
</script>

<template>
  <div class="grow" />

  <div class="flex items-center justify-center gap-3">
    <LocaleSwitcher />

    <UColorModeButton />

    <UTooltip
      :text="t('header.viewOnGitHub')"
      :delay-duration="50"
    >
      <UButton
        icon="i-simple-icons-github"
        :aria-label="t('header.viewOnGitHub')"
        color="neutral"
        variant="ghost"
        trailing
        external
        to="https://github.com/sybers/snapmark"
        target="_blank"
      />
    </UTooltip>
  </div>

  <div class="flex justify-center mt-4">
    <span class="text-xs text-neutral-400">
      made with <span class="text-red-500">❤</span> by
      <a
        href="https://github.com/sybers"
        class="underline hover:text-neutral-600 dark:hover:text-neutral-300"
        target="_blank"
        rel="noopener noreferrer"
      >sybers</a>
    </span>
  </div>
</template>
