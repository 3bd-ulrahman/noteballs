import { defineStore, getActivePinia } from 'pinia';
import { auth } from '@/assets/js/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { emitter } from '@/emitter.js';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = useStorage('user', {});
  const errorMessage = ref('');

  function init() {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        user.value = userCredential;
      } else {
        user.value = {};
      }
    })
  }

  function register(credentials) {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        errorMessage.value = error.message.split(': ')[1];
      });
  }

  function login(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        user.value = userCredential.user;
        this.router.push('/notes');
      })
      .catch((error) => {
        errorMessage.value = error.message.split(': ')[1];
      });
  }

  function logout() {
    signOut(auth).then(() => {
      getActivePinia()._s.forEach(store => {
        if (store.$id === 'auth') {
          return;
        }
        store.$reset();
      });

      user.value = {};

      emitter.emit('logout');

      this.router.replace('/auth');
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return {
    user,
    errorMessage,

    init,
    register,
    login,
    logout
  }
});