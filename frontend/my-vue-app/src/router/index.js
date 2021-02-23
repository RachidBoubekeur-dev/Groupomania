import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (article.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue')
  },
  {
    path: '/article/new',
    name: 'Ajouter un article',
    // route level code-splitting
    // this generates a separate chunk (article/new.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "article/new" */ '../views/NewArticle.vue')
  },
  {
    path: '/article/share',
    name: 'Partager un article',
    // route level code-splitting
    // this generates a separate chunk (article/share.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "article/share" */ '../views/ShareArticle.vue')
  },
  {
    path: '/article/:id',
    name: 'View article',
    // route level code-splitting
    // this generates a separate chunk (article/:id.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "article/:id" */ '../views/ViewArticle.vue')
  },
  {
    path: '/article/update/:id',
    name: 'Modifier un article',
    // route level code-splitting
    // this generates a separate chunk (article/update/:id.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "article/update/:id" */ '../views/UpdateArticle.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    // route level code-splitting
    // this generates a separate chunk (profil.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profil" */ '../views/Profil.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (signup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
