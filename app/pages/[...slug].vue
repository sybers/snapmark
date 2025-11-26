<script setup lang="ts">
import { useAsyncData, useRoute, useSeoMeta, queryCollection } from '#imports';

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first();
});

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description,
});
</script>

<template>
  <UPageSection>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
    <div v-else>
      Page not found
    </div>
  </UPageSection>
</template>
