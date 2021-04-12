import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    editProduct: {},
    banners: [],
    editBanner: {}
  },
  mutations: {
    fetchProducts (state, payload) {
      state.products = payload
    },

    editProduct (state, payload) {
      state.editProduct = payload
      router.push(`/editProduct/${payload.id.toString()}`)
    },

    fetchBanners (state, payload) {
      state.banners = payload
    },

    editBanner (state, payload) {
      state.editBanner = payload
      router.push(`/editBanner/${payload.id.toString()}`)
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: '/users/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          if (data.role !== 'admin') {
            Swal.fire({
              icon: 'error',
              title: 'Invalid Email or Password'
            })
          } else {
            localStorage.access_token = data.access_token
            localStorage.id = data.id
            router.push('/')
            Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Login Successful',
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.msg}`
          })
        })
    },

    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        },
        params: {
          UserId: localStorage.id
        }
      })
        .then(({ data }) => {
          context.commit('fetchProducts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    addProduct (context, payload) {
      axios({
        url: '/products',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: `${payload.name} Product Added To Your Store`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
          context.dispatch('fetchProducts')
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.msg}`
          })
        })
    },

    editProduct (context, payload) {
      axios({
        url: `/products/${payload.id}`,
        method: 'PUT',
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category,
          UserId: localStorage.id
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.dispatch('fetchProducts')
          router.push('/')
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Product Edited',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.msg}`
          })
        })
    },

    deleteProduct (context, payload) {
      axios({
        url: `/products/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    fetchBanners (context) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        },
        params: {
          UserId: localStorage.id
        }
      })
        .then(({ data }) => {
          context.commit('fetchBanners', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    addBanner (context, payload) {
      axios({
        url: '/banners',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: `${payload.title} Banner Added To Your Store`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
          context.dispatch('fetchBanners')
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.msg}`
          })
        })
    },

    editBanner (context, payload) {
      console.log(payload)
      axios({
        url: `/banners/${payload.id}`,
        method: 'PUT',
        data: {
          title: payload.title,
          status: payload.status,
          image_url: payload.image_url,
          UserId: localStorage.id
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.dispatch('fetchBanners')
          router.push('/bannerDashboard')
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Banner Edited',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.msg}`
          })
        })
    },

    deleteBanner (context, payload) {
      axios({
        url: `/banners/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.dispatch('fetchBanners')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
