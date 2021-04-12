import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    banners: [],
    carts: [],
    transactionHistories: [],
    wishlists: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },

    setBanners (state, payload) {
      state.banners = payload
    },

    setIsLogin (state, payload) {
      state.isLogin = payload
    },

    setCarts (state, payload) {
      state.carts = payload
    },

    setTransactionHistories (state, payload) {
      state.transactionHistories = payload
    },

    setWishlists (state, payload) {
      state.wishlists = payload
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
          if (data.role === 'admin') {
            Swal.fire({
              icon: 'error',
              title: 'Invalid Email or Password'
            })
          } else {
            localStorage.access_token = data.access_token
            localStorage.id = data.id
            context.commit('setIsLogin', true)
            router.push('/')
            Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Login Successful',
              position: 'top-left',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            })
          }
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: `${err.response.data.msg}`,
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        })
    },

    register (context, payload) {
      axios({
        url: '/users/register',
        method: 'POST',
        data: payload
      })
        .then(() => {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Register Successful',
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
          router.push('/login')
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
        }
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
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
        }
      })
        .then(({ data }) => {
          context.commit('setBanners', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    fetchCarts (context) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    addCart (context, payload) {
      axios({
        url: '/carts',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          if (!data.updateId) {
            Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Product added to cart',
              position: 'top-left',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            })
          } else {
            axios({
              url: `/carts/${data.updateId}`,
              method: 'PATCH',
              headers: {
                access_token: localStorage.access_token
              },
              data: {
                quantity: 1
              }
            })
              .then(() => {
                Swal.fire({
                  toast: true,
                  icon: 'success',
                  title: 'Stock has been increased in your cart',
                  position: 'top-left',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true
                })
              })
              .catch((err) => {
                Swal.fire({
                  toast: true,
                  icon: 'error',
                  title: `${err.response.data.msg}`,
                  position: 'top-left',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true
                })
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    changeQuantity (context, payload) {
      axios({
        url: `/carts/${payload.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: payload.amount
        }
      })
        .then(() => {
          context.dispatch('fetchCarts')
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: `${err.response.data.msg}`,
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        })
    },

    deleteCart (context, payload) {
      axios({
        url: `/carts/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.dispatch('fetchCarts')
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'You delete a product from your cart',
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        })
    },

    checkoutCart (context) {
      axios({
        url: '/transactionHistories',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.commit('setCarts', [])
          router.push('/checkout')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    fecthTransactionHistories (context) {
      axios({
        url: '/transactionHistories',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('setTransactionHistories', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    fecthWishlists (context) {
      axios({
        url: '/wishlists',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('setWishlists', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    addWishlist (context, payload) {
      axios({
        url: '/wishlists',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: payload
        }
      })
        .then(() => {
          context.dispatch('fecthWishlists')
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'You Add a Wishlist',
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: `${err.response.data.msg}`,
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        })
    },

    deleteWishlist (context, payload) {
      axios({
        url: `/wishlists/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          context.dispatch('fecthWishlists')
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'You remove a wishlist',
            position: 'top-left',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getters: {
    inStockProduct: state => {
      return state.products.filter(element => element.stock > 0)
    }
  },
  modules: {
  }
})
