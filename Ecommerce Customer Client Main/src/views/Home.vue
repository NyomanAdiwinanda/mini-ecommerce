<template>
  <div>
    <BannersSlider />
    <h1>Shop Our Products</h1>
    <ProductCard />
  </div>
</template>

<script>
import BannersSlider from '../components/BannersSlider.vue'
import ProductCard from '../components/ProductCard.vue'
export default {
  components: {
    BannersSlider,
    ProductCard
  }
}
</script>

<style scoped>
  h1 {
    margin: 20px 0;
    width: 100%;
    text-align: center;
    color: white;
  }
</style>
