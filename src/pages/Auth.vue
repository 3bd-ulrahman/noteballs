<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/Auth';

const register = ref(false);

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login';
});

const credentials = reactive({
  email: '',
  password: ''
});

const submit = () => {
  if (!credentials.email || !credentials.password) {
    return alert('Please enter an email and password');
  }

  if (register.value) {
    useAuthStore().register(credentials);
  } else {
    useAuthStore().login(credentials);
  }
}
</script>

<template>
  <div class="auth">

    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">

        <form @submit.prevent="submit">
          <div class="title has-text-centered">
            {{ formTitle }}
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="credentials.email"
                class="input" type="email" placeholder="e.g. alexsmith@gmail.com"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="credentials.password"
                class="input" type="password" autocomplete="off" placeholder="Enter a password"
              >
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>

      </div>
    </div>

  </div>
</template>

<style>
.auth-form {
  max-width: 25em;
  margin: 0 auto;
}
</style>@/store/Auth