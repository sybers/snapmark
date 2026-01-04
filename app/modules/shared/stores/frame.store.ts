import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface FrameStoreOptions {
  frameName: string;
}

export const useFrameStore = defineStore('frame', () => {
  const frameName = ref('arc');
  const availableFrames = ['none', 'macos', 'arc'];

  function importValues(values: FrameStoreOptions) {
    frameName.value = values.frameName;
  }

  function exportValues(): FrameStoreOptions {
    return {
      frameName: frameName.value,
    };
  }

  return {
    frameName,
    availableFrames,
    importValues,
    exportValues,
  };
});
