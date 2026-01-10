import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingsStore } from '../stores/settings.store';

export function useFrameSettings() {
  const { settings } = storeToRefs(useSettingsStore());

  const frameName = computed({
    get: () => settings.value.frame.frameName,
    set: (value) => {
      settings.value.frame.frameName = value;
    },
  });

  const availableFrames = ['none', 'arc', 'macos', 'windows'];

  return {
    frameName,
    availableFrames,
  };
}
