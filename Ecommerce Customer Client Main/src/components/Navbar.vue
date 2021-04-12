<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark py-md-4 navigation-bar">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#" @click.prevent="goTo('/')"><i class="fas fa-gem"></i> Mini Ecommerce</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="goTo('/')"><b>Store</b></a>
        </li>
      </ul>
      <button class="btn btn-warning my-2 my-sm-0" type="submit" @click.prevent="showCart">My Cart</button>
      <button class="btn btn-primary my-2 my-sm-0" type="submit" @click.prevent="showTransactionHistory">Transaction History</button>
      <button type="button" class="btn btn-light" @click.prevent="showWishlists">My Wishlists</button>
      <div v-if="isLogin === false">
        <button class="btn btn-success my-2 my-sm-0" type="submit" @click.prevent="goTo('/login')">Login</button>
        <button class="btn btn-info my-2 my-sm-0" type="submit" @click.prevent="goTo('/register')">Register</button>
      </div>
      <div v-if="isLogin === true">
        <button class="btn btn-danger my-2 my-sm-0" type="submit" @click.prevent="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },

  methods: {
    goTo (path) {
      this.$router.push(path)
    },

    logout () {
      localStorage.clear()
      this.$store.commit('setIsLogin', false)
      this.$router.push('/')
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'You have been logged out',
        position: 'top-left',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
    },

    showCart () {
      if (this.isLogin === false) {
        Swal.fire({
          title: 'Please Login To See Cart',
          icon: 'info',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Login Now',
          cancelButtonText: 'Cancel',
          preConfirm: () => {
            this.$router.push('/login')
          }
        })
      } else {
        this.$router.push('/cart')
      }
    },

    showTransactionHistory () {
      if (this.isLogin === false) {
        Swal.fire({
          title: 'Please Login To See Transaction History',
          icon: 'info',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Login Now',
          cancelButtonText: 'Cancel',
          preConfirm: () => {
            this.$router.push('/login')
          }
        })
      } else {
        this.$router.push('/transactionHistory')
      }
    },

    showWishlists () {
      if (this.isLogin === false) {
        Swal.fire({
          title: 'Please Login To See Your Wishlists',
          icon: 'info',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Login Now',
          cancelButtonText: 'Cancel',
          preConfirm: () => {
            this.$router.push('/login')
          }
        })
      } else {
        this.$router.push('/wishlists')
      }
    }
  }
}
</script>

<style scoped>
  button {
    margin-left: 20px;
  }
</style>
