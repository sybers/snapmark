<template>
  <header class="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
    <div class="flex items-center justify-between px-6 py-3">
      <div class="flex items-center gap-3">
        <img
          src="~/assets/images/icon/snapmark-logotype.svg"
          alt="Snapmark"
          class="h-6 w-auto"
        >
      </div>

      <div class="flex items-center gap-3">
        <UButton
          icon="i-simple-icons-github"
          label="Voir sur GitHub"
          color="neutral"
          variant="ghost"
          trailing
          external
          to="https://github.com/sybers/snapmark"
          target="_blank"
        />
      </div>
    </div>
  </header>
</template>
