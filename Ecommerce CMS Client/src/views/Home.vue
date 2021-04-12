<template>
  <div>
    <Navbar />
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Navbar
  },

  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchBanners')
  }
}
</script>

<style scoped>
#content {
  margin-left: 85px;
  height: 100vh;
  background-color: #8d8d8d;
}
</style>
