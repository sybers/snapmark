import { toValue, type MaybeRefOrGetter, type Ref } from 'vue';

export interface FileUploadOptions {
  accept: MaybeRefOrGetter<string>;
  model: Ref<File | null>;
}

export function useFileUpload({ accept, model }: FileUploadOptions) {
  function upload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = toValue(accept);
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        model.value = file;
      }
    };
    fileInput.click();
  }

  return {
    upload,
  };
}
