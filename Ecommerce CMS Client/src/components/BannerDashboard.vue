<template>
  <div>
    <div id="d-flex align-items center justify-content-center" class="banners">
    <button class="btn btn-dark navigation" @click.prevent="goTo('')"><b>PRODUCT DASHBOARD</b></button>
    <button class="btn btn-dark navigation" @click.prevent="goTo('bannerDashboard')"><b>BANNER DASHBOARD</b></button>
      <div class="row">
        <div class="col-11 banner-card" v-for="banner in banners" :key="banner.id">
          <h3>{{ banner.title }}</h3><br>
          <img :src="banner.image_url"><br><br>
          <h4>Status: {{ banner.status ? "Active" : "Inactive" }}</h4><br>
          <button class="btn btn-warning" @click.prevent="editBanner(banner)"><b>EDIT</b></button>
          <button class="btn btn-danger" @click.prevent="deleteBanner(banner.id, banner.title)"><b>DELETE</b></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },

  methods: {
    goTo (path) {
      this.$router.push(`/${path}`)
    },

    editBanner (product) {
      this.$store.commit('editBanner', product)
    },

    deleteBanner (id, title) {
      Swal.fire({
        title: `Deleting ${title}`,
        text: "Are you sure? You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteBanner', id)
          Swal.fire(
            'Deleted!',
            `Your ${title} banner has been deleted.`,
            'success'
          )
        }
      })
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  img {
    height: 300px;
    width: 700px;
  }

  .banners {
    text-align: center;
    background-color: #8d8d8d;
  }

  .banner-card {
    background-color: white;
    border: solid black 2px;
    margin: 10px 65px;
    padding: 10px 0;
  }

  button {
    padding: 0px 30px;
    margin: 0px 10px;
  }

  button.navigation {
    padding: 5px 30px;
    margin: 20px 10px;
  }
</style>
