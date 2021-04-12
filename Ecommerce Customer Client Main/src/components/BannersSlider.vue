<template>
  <div>
    <vueper-slides
    ref="myVueperSlides"
    autoplay
    :fixed-height="false"
    :slide-ratio="1/2.2">
      <vueper-slide v-for="(banner, i) in banners"
      :key="i"
      :image="banner.image_url"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  components: {
    VueperSlides,
    VueperSlide
  },

  computed: {
    banners () {
      return this.$store.state.banners
    }
  }
}
</script>

<style scoped>
</style>
