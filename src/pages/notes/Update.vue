<script setup>
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import { ref } from 'vue';
import { useNotesStore } from '@/stores/Notes';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const noteContent = ref('');
noteContent.value = useNotesStore().show(route.params.id);

const updateNote = () => {
  useNotesStore().update(route.params.id, noteContent.value);
  router.push('/notes');
}
</script>

<template>
  <div class="edit-note">
    <AddEditNote
      v-model:note="noteContent"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
      ref="addEditNoteRef"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Cancel
        </button>
        <button :disabled="noteContent.length < 10"
          @click="updateNote()"
          class="button is-link has-background-link"
        >
          Edit Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>