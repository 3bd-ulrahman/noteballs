<script setup>
import { ref } from 'vue';
import { useNotesStore } from '../stores/Notes';
import { useWatchCharacters } from '@/composables/useWatchCharacters';

const loveNoteballs = ref('');

useWatchCharacters(loveNoteballs, 50);
</script>

<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ useNotesStore().totalNotesCount() }}</td>
        </tr>
        <tr>
          <td>Number of Character (of all notes)</td>
          <td>{{ useNotesStore().totalCharactersCount() }}</td>
        </tr>
      </tbody>
    </table>
    <input type="text" v-autofocus
      v-model="loveNoteballs"
      class="input"
      placeholder="Do you love noteballs??"
    >
  </div>
</template>