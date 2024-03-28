import { watch } from "vue";

export function useWatchCharacters(valueToWatch, maxChars = 100) {
  watch(valueToWatch, (newValue, oldValue) => {
    if (newValue.length === maxChars) {
      alert(`Note cannot be more than ${maxChars} characters`);
    }
  });
}