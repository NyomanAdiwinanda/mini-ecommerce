import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../views/Authentication.vue'
import ProductDashboard from '../components/ProductDashboard.vue'
import AddProduct from '../components/AddProduct.vue'
import AddBanner from '../components/AddBanner.vue'
import EditProduct from '../components/EditProduct.vue'
import BannerDashboard from '../components/BannerDashboard.vue'
import EditBanner from '../components/EditBanner.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/productDashboard',
        name: 'ProductDashboard',
        component: ProductDashboard
      },
      {
        path: '/bannerDashboard',
        name: 'BannerDashboard',
        component: BannerDashboard
      },
      {
        path: '/addProduct',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: '/addBanner',
        name: 'AddBanner',
        component: AddBanner
      },
      {
        path: '/editProduct/:id',
        name: 'EditProduct',
        component: EditProduct
      },
      {
        path: '/editBanner/:id',
        name: 'EditBanner',
        component: EditBanner
      }
    ]
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.access_token) next({ path: '/login' })
  else next()

  if (to.path === '/login' && localStorage.access_token) next({ path: '/' })
  else next()

  if (to.path === '/' && localStorage.access_token) next({ path: '/productDashboard' })
  else next()
})

export default router
