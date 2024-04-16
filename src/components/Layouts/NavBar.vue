<script setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useAuthStore } from '@/stores/Auth';

const showMobileNav = ref(false);

const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, event => {
  showMobileNav.value = false
}, {ignore: [navbarBurgerRef]});

const user = computed(() => {
  return JSON.parse(window.localStorage.getItem('user'));
});

const logout = () => {
  showMobileNav.value = false;
  useAuthStore().logout();
}
</script>

<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">

      <div class="navbar-brand" ref="navbarBurgerRef">
        <div class="navbar-item is-size-4 is-family-monospace">
          Noteballs
        </div>

        <a @click.prevent="showMobileNav = !showMobileNav"
          :class="{ 'is-active' : showMobileNav }"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div :class="{ 'is-active' : showMobileNav }"
        id="navbarBasicExample"
        class="navbar-menu"
        ref="navbarMenuRef"
      >
        <div class="navbar-end">
          <RouterLink to="/notes"
            active-class="is-active"
            @click="showMobileNav = false"
            class="navbar-item"
          >
            Notes
          </RouterLink>
          <RouterLink to="/stats"
            active-class="is-active"
            @click="showMobileNav = false"
            class="navbar-item"
          >
            Stats
          </RouterLink>
          <button @click="logout()" v-if="user"
            class="button is-success fas fa-align-left" style="height: 100%;"
          >
            Log out {{ user.email }}
          </button>
        </div>
      </div>

    </div>
  </nav>
</template>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>