<script setup>
import { ref } from 'vue';

const props = defineProps({
  note: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Type something...'
  },
  label: {
    type: String
  }
});

const emit = defineEmits(['update:note']);


const textareaRef = ref(null);

const focusTextarea = () => {
  textareaRef.value.focus();
}

defineExpose({
  focusTextarea
});
</script>

<template>
  <div class="card p-4 mb-5" :class="`has-background-${props.bgColor}-dark`">
    <label v-if="props.label" class="label has-text-white">
      {{ props.label }}
    </label>
    <div class="field">
      <div class="control">
        <textarea :value="note" @input="$emit('update:note', $event.target.value)"
          ref="textareaRef"
          :placeholder="props.placeholder"
          v-autofocus
          maxlength="100"
          class="textarea"
        />
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>