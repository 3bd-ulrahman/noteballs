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

export default router;