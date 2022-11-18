import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: HomeView
  },
  {
    path: '/main',
    name: 'main',
    meta: {layout: 'main'},
    component: () => import('@/views/MainView')
  },
  {
    path: '/users',
    name: 'users',
    meta: {layout: 'main'},
    component: () => import('@/views/UsersView')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {layout: 'main'},
    component: () => import('@/views/OrdersView')
  },
  {
    path: '/rates',
    name: 'rates',
    meta: {layout: 'main'},
    component: () => import('@/views/RatesView')
  },
  {
    path: '/rate/:id',
    name: 'rate',
    meta: {layout: 'main'},
    component: () => import('@/views/RateChangeView')
  },
  {
    path: '/links',
    name: 'links',
    meta: {layout: 'main'},
    component: () => import('@/views/LinksView')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {layout: 'main'},
    component: () => import('@/views/SettingsView')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
