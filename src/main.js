// import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from '@/router/index.js';
import { vAutofocus } from './directives/vAutofocus';

const app = createApp(App);
const pinia = createPinia();

app.directive('autofocus', vAutofocus);

app.use(pinia).use(router);
app.mount('#app');
