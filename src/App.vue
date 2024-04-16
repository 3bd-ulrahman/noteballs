<script setup>
import { onBeforeMount } from 'vue';
import NavBar from './components/Layouts/NavBar.vue';
import { useAuthStore } from './stores/Auth';

onBeforeMount(() => {
  useAuthStore().init();
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