<template>
  <nav>
    <a href="#" @click.prevent="goTo('')"><i class="fas fa-house-user"></i><span class="title">Dashboard</span></a>
    <a href="#" @click.prevent="goTo('addProduct')"><i class="fas fa-cart-plus"></i><span class="title">Add Product</span></a>
    <a href="#" @click.prevent="goTo('addBanner')"><i class="fas fa-image"></i><span class="title">Add Banner</span></a>
    <a href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i><span class="title">Logout</span></a>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Logout Successful',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    },

    goTo (path) {
      this.$router.push(`/${path}`)
    }
  }
}
</script>

<style>
:root {
  --primary-color: #D96AA7;
  --secondary-color: #422C73;
  --complimentary-color: #88BFB5;
  --contrast-color: #F2E527;
  --light-color: #D2A9D9;
}

nav a {
  font-size: 40px;
  color: #fff;
  text-decoration: none;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-top: 100%;
}

nav {
  position: fixed;
  z-index: 50;
  left: 0;
  height: 100%;
  width: 85px;
  background: var(--secondary-color);
}

nav a:hover {
  color: gold;
}

span.title {
  padding-top: 5px;
  font-size: 10px;
}
</style>
