// import './assets/main.css';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from '@/router/index.js';
import { vAutofocus } from './directives/vAutofocus';
import resetStore from './stores/reset-store';

const pinia = createPinia();
const app = createApp(App);

pinia.use(({ store }) => {
  store.router = markRaw(router)
});
pinia.use(resetStore);

app.directive('autofocus', vAutofocus);

app.use(pinia).use(router);
app.mount('#app');
