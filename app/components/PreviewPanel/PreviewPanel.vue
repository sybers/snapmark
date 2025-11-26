<template>
  <div class="flex-1 lg:w-2/3 bg-linear-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
    <UCard class="w-full max-w-4xl">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Preview
          </h2>
          <div class="flex gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-arrow-path"
            />
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-arrows-pointing-out"
            />
          </div>
        </div>
      </template>

      <div class="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div class="text-center space-y-4">
          <UIcon
            name="i-heroicons-photo"
            class="w-16 h-16 mx-auto text-gray-400"
          />
          <p class="text-gray-500 dark:text-gray-400">
            Upload a screenshot to get started
          </p>
          <UButton
            color="primary"
            size="lg"
          >
            <UIcon
              name="i-heroicons-arrow-up-tray"
              class="w-5 h-5 mr-2"
            />
            Upload Screenshot
          </UButton>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ canvasWidth }} × {{ canvasHeight }}
          </div>
          <div class="flex gap-2">
            <UTooltip
              text="Copy PNG image to clipboard"
              :delay-duration="50"
              :content="{ side: 'top' }"
              :kbds="['meta', 'C']"
            >
              <UButton
                label="Copy"
                color="neutral"
                icon="i-heroicons-clipboard"
                variant="outline"
              />
            </UTooltip>
            <UFieldGroup size="xl">
              <UButton
                color="neutral"
                variant="subtle"
                label="Save"
              />
              <UDropdownMenu
                :ui="{ content: 'w-[180px]' }"
                :items="[
                  {
                    label: 'as PNG',
                    kbds: ['meta', 's'],
                  },
                  {
                    label: 'as JPG',
                    kbds: ['meta', 'j'],
                  },
                  {
                    label: 'as SVG',
                    kbds: ['meta', 'g'],
                  },
                ]"
              >
                <UButton
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-chevron-down"
                />
              </UDropdownMenu>
            </UFieldGroup>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  canvasWidth: number;
  canvasHeight: number;
}>();
</script>
