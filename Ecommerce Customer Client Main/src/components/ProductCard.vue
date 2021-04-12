<template>
  <div id="d-flex align-items center justify-content-center" class="products">
    <div class="row">
      <div class="col-2 product-card" v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3><br>
        <img :src="product.image_url"><br><br>
        <h4>Rp. {{ product.price.toLocaleString("id") }}</h4><br>
        <button class="btn btn-success" @click.prevent="addCart(product)"><b>Add To Cart</b></button><br>
        <button class="btn btn-dark" @click.prevent="addWishlist(product.id)"><b>Add To Wishlist</b></button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      selectedStock: 1
    }
  },

  computed: {
    products () {
      return this.$store.getters.inStockProduct
    },

    isLogin () {
      return this.$store.state.isLogin
    }
  },

  methods: {
    addCart (product) {
      if (this.isLogin === false) {
        Swal.fire({
          title: 'Please Login To Add Product To Cart',
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
        const data = {
          total_price: product.price,
          quantity: 1,
          ProductId: product.id,
          UserId: localStorage.id
        }
        this.$store.dispatch('addCart', data)
      }
    },

    addWishlist (id) {
      if (this.isLogin === false) {
        Swal.fire({
          title: 'Please Login To Add Product To Your Wishlist',
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
        this.$store.dispatch('addWishlist', id)
      }
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
    height: 170px;
    width: 250px;
  }

  .products {
    text-align: center;
  }

  .product-card {
    background-color: white;
    border: solid green 4px;
    border-radius: 5%;
    margin: 10px 65px;
    padding: 10px 0;
  }

  button {
    padding: 0px 30px;
    margin: 0px 10px;
  }
</style>
