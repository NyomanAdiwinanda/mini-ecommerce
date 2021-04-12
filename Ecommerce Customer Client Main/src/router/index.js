import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import TransactionHistory from '../views/TransactionHistory.vue'
import Wishlists from '../views/Wishlists.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: Cart,
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/transactionHistory',
    name: 'TransactionHistory',
    component: TransactionHistory
  },
  {
    path: '/wishlists',
    name: 'Wishlists',
    component: Wishlists
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && localStorage.access_token) next({ path: '/' })
  else next()

  if (to.path === '/register' && localStorage.access_token) next({ path: '/' })
  else next()

  if (to.path === '/cart' && !localStorage.access_token) next({ path: '/login' })
  else next()

  if (to.path === '/checkout' && !localStorage.access_token) next({ path: '/' })
  else next()

  if (to.path === '/transactionHistory' && !localStorage.access_token) next({ path: '/login' })
  else next()

  if (to.path === '/wishlists' && !localStorage.access_token) next({ path: '/login' })
  else next()
})

export default router
