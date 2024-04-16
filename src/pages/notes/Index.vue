<script setup>
import { onMounted, ref, watch } from 'vue';
import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { useNotesStore } from '@/stores/Notes';
import { useWatchCharacters } from '@/composables/useWatchCharacters';

const newNote = ref('');
const addEditNoteRef = ref(null);

const addNote = () => {
  useNotesStore().store(newNote.value);

  newNote.value = '';
  addEditNoteRef.value.focusTextarea();
}

useWatchCharacters(newNote);

// keyboard control
onMounted(() => {
  useNotesStore().index();

  const enterKeyHandler = (event) => {
    if (event.key === 'Enter') {
      addNote();
    }
  };

  document.addEventListener('keyup', enterKeyHandler);
});
</script>

<template>
  <div class="notes">

    <AddEditNote
      v-model:note="newNote"
      placeholder="Add a new note"
      ref="addEditNoteRef"
    >
      <template #buttons>
        <button @click="addNote()" :disabled="newNote.length < 10"
          class="button is-link has-background-success"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress v-if="!useNotesStore().notesLoaded" class="progress is-large is-success" max="100" />

    <Note
      v-for="note in useNotesStore().notes"
      :key="note.id"
      :note="note"
    />

    <div v-if="!useNotesStore().notes.length"
      class="is-size-4 has-text-centered has-text-grey-light is-family-monospace pt-6"
    >
      no notes here yet...
    </div>

  </div>
</template>