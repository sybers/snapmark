<script setup lang="ts">
import { computed } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';
import { useI18n } from '#imports';

const { locales, setLocale } = useI18n();

const menuItems = computed<DropdownMenuItem[]>(() => locales.value.map((locale) => ({
  label: locale.name,
  key: locale.code,
  onSelect: () => {
    setLocale(locale.code);
  },
})));
</script>

<template>
  <UDropdownMenu :items="menuItems">
    <UButton
      :aria-label="$t('open')"
      icon="heroicons:language-20-solid"
      color="neutral"
      variant="ghost"
    />
  </UDropdownMenu>
</template>
