const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/DashboardPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('../pages/LoginPage.vue') }],
  },

  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/DashboardPage.vue') }],
  },
  {
    path: '/forms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/Forms.vue') }],
  },
  {
    path: '/FireOnly',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/forms/FireOnly/FireOnly.vue') }],
  },
  {
    path: '/FireAll',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/forms/FireAllExtended/FireAllExtended.vue') }],
  },
  {
    path: '/SmartCas',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/forms/SmartCas/SmartCas.vue' ) }],
  },
  {
    path: '/SmartEconomyCas',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/forms/SmartEconomyCas/SmartEconomyCas.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
