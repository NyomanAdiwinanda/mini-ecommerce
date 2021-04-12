<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <div class="card rounded-1 border-0 shadow">
            <div class="card-body p-4">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <h1>Cart</h1>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product Name</th>
                      <th scope="col"></th>
                      <th scope="col">Quantity</th>
                      <th scope="col"></th>
                      <th scope="col">Price</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(cart, i) in carts" :key="i">
                        <th scope="row">{{ i+1 }}</th>
                        <td>{{ cart.Product.name}}</td>
                        <td><button class="btn btn-danger" @click.prevent="changeQuantity(cart.id, -1)"><b>-</b></button></td>
                        <td style="text-align: center;">{{ cart.quantity }}</td>
                        <td><button class="btn btn-success" @click.prevent="changeQuantity(cart.id, 1)"><b>+</b></button></td>
                        <td>Rp. {{ cart.total_price.toLocaleString('id') }}</td>
                        <td><button class="btn btn-danger" @click.prevent="deleteCart(cart.id)"><b>Delete</b></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 v-if="carts.length === 1">Total Price: Rp. {{ carts[0].total_price }}</h1>
              <h1 v-if="carts.length > 1">Total Price: Rp. {{
                carts.map((element) => {return element.total_price}).reduce((prev, next) => { return prev + next}).toLocaleString('id')
                }}</h1>
              <a class="btn btn-primary rounded-0 btn-block" id="insertRow" href="#" @click.prevent="checkoutCart">Checkout Cart</a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },

  methods: {
    changeQuantity (id, amount) {
      const data = {
        id,
        amount
      }
      this.$store.dispatch('changeQuantity', data)
    },

    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    },

    checkoutCart () {
      this.$store.dispatch('checkoutCart')
    }
  },

  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style scoped>

</style>
