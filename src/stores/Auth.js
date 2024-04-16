import { defineStore, getActivePinia } from 'pinia';
import { auth } from '@/assets/js/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { emitter } from '@/emitter.js';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});

  function init() {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        user.value = userCredential;
      } else {
        window.localStorage.removeItem('user');
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
        console.log('error.message: ', error.message);
      });
  }

  function login(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        user.value = userCredential.user;
        window.localStorage.setItem('user', JSON.stringify(user.value));

        this.router.push('/notes');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error.message', error.message);
      });
  }

  function logout() {
    signOut(auth).then(() => {
      localStorage.removeItem('user');

      getActivePinia()._s.forEach(store => {
        store.$reset();
      });

      emitter.emit('logout');

      this.router.replace('/auth').then(() => {
        window.location.reload();
      });
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return {
    user,

    init,
    register,
    login,
    logout
  }
});