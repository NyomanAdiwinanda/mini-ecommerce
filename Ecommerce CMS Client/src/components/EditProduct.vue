<template>
  <div class="main-block">
    <div class="left-part">
      <i class="fas fa-edit"></i>
      <h1>EDIT PRODUCT</h1>
      <p class="description">Submit the form to edit the existing product in your store</p>
    </div>
    <form @submit.prevent="edit(id)">
      <div class="title">
        <i class="fas fa-pencil-alt"></i>
        <h2>EDIT PRODUCT HERE</h2>
      </div>
      <div class="info">
        <input class="fname" type="text" placeholder="Name" v-model="name" required>
        <input type="text" placeholder="Image URL" v-model="image_url" required>
        <input type="number" placeholder="Price" v-model="price" required>
        <input type="number" placeholder="Stock" v-model="stock">
        <input type="text" placeholder="Category" v-model="category">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: this.$store.state.editProduct.name,
      image_url: this.$store.state.editProduct.image_url,
      price: this.$store.state.editProduct.price,
      stock: this.$store.state.editProduct.stock,
      category: this.$store.state.editProduct.category,
      id: this.$route.params.id
    }
  },

  methods: {
    edit (id) {
      const data = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category,
        id
      }
      this.$store.dispatch('editProduct', data)
    }
  }
}
</script>

<style scoped>
body, div, form, input, select, p {
  padding: 0;
  margin: 0;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  color: #eee;
}
h1, h2 {
  text-transform: uppercase;
  font-weight: 400;
}
h2 {
  margin: 0 0 0 8px;
}
.description {
  font-size: 20px;
}
.main-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 25px;
  position: relative;
  right: 8%;
}
.left-part, form {
  padding: 25px;
}
.left-part {
  text-align: center;
}
.fa-edit {
  font-size: 72px;
}
form {
  background: rgba(0, 0, 0, 0.7);
}
.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.info {
  display: flex;
  flex-direction: column;
}
input, select {
  padding: 5px;
  margin-bottom: 30px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #eee;
}
input::placeholder {
  color: #eee;
}
option:focus {
  border: none;
}
option {
  background: black;
  border: none;
}
.checkbox input {
  margin: 0 10px 0 0;
  vertical-align: middle;
}
.checkbox a {
  color: #26a9e0;
}
.checkbox a:hover {
  color: #85d6de;
}
.btn-item, button {
  padding: 10px 5px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  background: #26a9e0;
  text-decoration: none;
  font-size: 15px;
  font-weight: 400;
  color: #fff;
}
.btn-item {
  display: inline-block;
  margin: 20px 5px 0;
}
button {
  width: 100%;
}
button:hover, .btn-item:hover {
  background: #85d6de;
}
@media (min-width: 568px) {
  html, body {
    height: 100%;
  }
  .main-block {
    flex-direction: row;
    height: calc(100% - 50px);
  }
  .left-part, form {
    flex: 1;
    height: auto;
  }
}
</style>
