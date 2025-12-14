<script setup lang="ts">
import LocaleSwitcher from './LocaleSwitcher.vue';
</script>

<template>
  <header class="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
    <div class="flex items-center justify-between px-6 py-3">
      <div class="flex items-center gap-3">
        <UColorModeImage
          light="/images/icon/snapmark-logotype.svg"
          dark="/images/icon/snapmark-logotype-dark.svg"
          alt="Snapmark"
          class="h-8 w-auto"
        />
      </div>

      <div class="flex items-center gap-3">
        <LocaleSwitcher />

        <UTooltip
          :text="$t('viewOnGitHub')"
          :delay-duration="50"
        >
          <UButton
            icon="i-simple-icons-github"
            :aria-label="$t('viewOnGitHub')"
            color="neutral"
            variant="subtle"
            trailing
            external
            to="https://github.com/sybers/snapmark"
            target="_blank"
          />
        </UTooltip>
      </div>
    </div>
  </header>
</template>
