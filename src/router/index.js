import { useAuthStore } from '@/stores/Auth.js';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/notes',
    name: 'notes.index',
    component: () => import('@/pages/notes/Index.vue')
  },
  {
    path: '/notes/update/:id',
    name: 'notes.update',
    component: () => import('@/pages/notes/Update.vue')
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/pages/Stats.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/Auth.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from) => {
  if (!useAuthStore().user.uid && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (useAuthStore().user.uid && to.name === 'auth') {
    return false;
  }
});

export default router;