<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-12 mx-auto">
        <div class="card rounded-1 border-0 shadow">
          <div class="card-body p-4">
            <div class="table-responsive">
              <h1>Your Transaction History</h1>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(history, i) in transactionHistories" :key="i">
                      <th scope="row">{{ i+1 }}</th>
                      <td>{{ history.Product.name}}</td>
                      <td style="text-align: center;">{{ history.quantity }}</td>
                      <td>Rp. {{ (history.total_price / history.quantity).toLocaleString('id') }}</td>
                      <td>Rp. {{ history.total_price.toLocaleString('id') }}</td>
                      <td>{{ history.createdAt }}</td>
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
export default {
  computed: {
    transactionHistories () {
      return this.$store.state.transactionHistories
    }
  },

  created () {
    this.$store.dispatch('fecthTransactionHistories')
  }
}
</script>

<style>

</style>
