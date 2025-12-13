<template>
  <div class="h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
    <div class="flex flex-col items-center gap-6 animate-pulse">
      <div class="relative w-16 h-16">
        <svg
          class="w-full h-full animate-spin"
          viewBox="0 0 50 50"
        >
          <circle
            class="spinner-path stroke-primary-500"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          />
        </svg>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
        Chargement en cours...
      </p>
    </div>
  </div>
</template>

<style scoped>
.spinner-path {
  stroke-linecap: round;
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
}

.loading-text {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
