<script setup>
import { computed, reactive } from 'vue';
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue';
import { useDateFormat } from '@vueuse/core';

const props = defineProps({
  note: {
    required: true,
    type: Object
  }
});

const dateFormatted = computed(() => {
  let date = parseInt(props.note.date);
  return useDateFormat(date, 'DD MMM YYYY H:mm').value;
})
const characterLength = computed(() => {
  return props.note.content.length;
});

// Modal
const modals = reactive({
  deleteNote: false
})
</script>

<template>
  <div class="card mb-4">

    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">
            {{ characterLength }} characters
          </small>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <RouterLink :to="`notes/update/${note.id}`" class="card-footer-item">
        Edit
      </RouterLink>
      <a @click.prevent="modals.deleteNote = true" href="#" class="card-footer-item">
        Delete
      </a>
    </footer>

    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model:modals="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>