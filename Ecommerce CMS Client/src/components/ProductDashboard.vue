<template>
  <div>
    <div id="d-flex align-items center justify-content-center" class="products">
    <button class="btn btn-dark navigation" @click.prevent="goTo('')"><b>PRODUCT DASHBOARD</b></button>
    <button class="btn btn-dark navigation" @click.prevent="goTo('bannerDashboard')"><b>BANNER DASHBOARD</b></button>
      <div class="row">
        <div class="col-3 product-card" v-for="product in products" :key="product.id">
          <h3>{{ product.name }}</h3><br>
          <img :src="product.image_url"><br><br>
          <h4>Rp. {{ product.price.toLocaleString("id") }}</h4>
          <h4>Stock: {{ product.stock }}</h4><br>
          <h4>Category: {{ product.category }}</h4><br>
          <button class="btn btn-warning" @click.prevent="editProduct(product)"><b>EDIT</b></button>
          <button class="btn btn-danger" @click.prevent="deleteProduct(product.id, product.name)"><b>DELETE</b></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  computed: {
    products () {
      return this.$store.state.products
    }
  },

  methods: {
    goTo (path) {
      this.$router.push(`/${path}`)
    },

    editProduct (product) {
      this.$store.commit('editProduct', product)
    },

    deleteProduct (id, name) {
      Swal.fire({
        title: `Deleting ${name}`,
        text: "Are you sure? You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteProduct', id)
          Swal.fire(
            'Deleted!',
            `Your ${name} product has been deleted.`,
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
    height: 200px;
    width: 300px;
  }

  .products {
    text-align: center;
    background-color: #8d8d8d;
  }

  .product-card {
    background-color: white;
    border: solid black 2px;
    border-radius: 5%;
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
