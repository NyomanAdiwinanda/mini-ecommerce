<template>
  <div class="checkout">
    <h1>Checkout Successfull</h1>
    <h1>Thank You for your purchase!</h1>
    <br>
    <h3><a href="#" @click.prevent="goTo('/')">Go Back to Store</a></h3>
  </div>
</template>

<script>
export default {
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
  .checkout {
    color: white;
    text-align: center;
    position: relative;
    top: 100px;
  }
</style>
