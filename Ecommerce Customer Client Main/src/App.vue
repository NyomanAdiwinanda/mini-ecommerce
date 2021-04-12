<template>
  <div id="app">
    <Navbar />
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  },

  computed: {
    products () {
      return this.$store.state.products
    }
  },

  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchBanners')
    if (localStorage.access_token) {
      this.$store.commit('setIsLogin', true)
    }
  }
}
</script>

<style scoped>
  .view {
    margin-top: 88px;
  }
</style>
