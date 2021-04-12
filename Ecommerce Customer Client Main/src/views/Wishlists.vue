<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-12 mx-auto">
        <div class="card rounded-1 border-0 shadow">
          <div class="card-body p-4">
            <div class="table-responsive">
              <h1>My Wishlists</h1>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(wishlist, i) in wishlists" :key="i">
                      <th scope="row">{{ i+1 }}</th>
                      <td>{{ wishlist.Product.name }}</td>
                      <td>Rp. {{ wishlist.Product.price.toLocaleString('id') }}</td>
                      <td>
                        <button class="btn btn-success" @click.prevent="addCart(wishlist.Product)"><b>Add To Cart</b></button>
                        <button class="btn btn-danger" @click.prevent="deleteWishlist(wishlist.id)"><b>Delete</b></button>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  computed: {
    wishlists () {
      return this.$store.state.wishlists
    }
  },

  methods: {
    deleteWishlist (id) {
      this.$store.dispatch('deleteWishlist', id)
    },

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
    }
  },

  created () {
    this.$store.dispatch('fecthWishlists')
  }
}
</script>

<style>

</style>
