<script setup>
import { vOnClickOutside } from '@vueuse/components';
import { onMounted } from 'vue';
import { useNotesStore } from '@/stores/Notes.js';

const props = defineProps({
  noteId: {
    type: String,
    required: true
  }
});

const modals = defineModel('modals');

function closeModal() {
  modals.value = false;
}

// keyboard control
onMounted(() => {
  const escapeKeyHandler = (event) => {
    if (event.key === 'Escape') {
      closeModal();
      document.removeEventListener('keyup', escapeKeyHandler);
    }
  };

  document.addEventListener('keyup', escapeKeyHandler);
});
</script>

<template>
  <div class="modal is-active p-4">

    <div class="modal-background"></div>

    <div class="modal-card" v-on-click-outside="closeModal">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="modals = false"></button>
      </header>

      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>

      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="modals = false">Cancel</button>
        <button class="button is-danger" @click="useNotesStore().destroy(noteId)">
          Delete
        </button>
      </footer>
    </div>

  </div>
</template>