import Vue from 'vue'
import VueRouter from 'vue-router'
import Tables from '../views/Tables.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tables',
    name: 'Tables',
    component: Tables
  },
  {
    path: '/',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
