<script setup>
import { onMounted } from 'vue';
import NavBar from './components/Layouts/NavBar.vue';
import { useNotesStore } from './stores/Notes';

onMounted(() => {
  useNotesStore().index();
});
</script>

<template>
  <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>