<template>
  <div>
    <h1>404 - Page Not Found</h1>
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
  h1 {
    color: white;
  }
</style>
