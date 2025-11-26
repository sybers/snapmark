import { toValue, ref, type MaybeRefOrGetter } from 'vue';

export function useMessage(message: MaybeRefOrGetter<string>) {
  const initialMessage = toValue(message);
  const internalMessage = ref(toValue(message));

  return {
    message: internalMessage,
    reset: () => {
      internalMessage.value = initialMessage;
    },
  };
}
