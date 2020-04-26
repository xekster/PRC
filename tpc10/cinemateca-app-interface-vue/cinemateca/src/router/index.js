import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Página Principal',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/filmes',
    name: 'Página Principal',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/filmes/:id',
    name: 'Consulta Filme',
    component: () => import('../views/Consulta.vue')
  },
  {
    path: '/atores',
    name: 'Lista de Atores',
    component: () => import('../views/AtoresL.vue')
  },
  {
    path: '/atores/:id',
    name: 'Consulta Ator',
    component: () => import('../views/UmAtor.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
