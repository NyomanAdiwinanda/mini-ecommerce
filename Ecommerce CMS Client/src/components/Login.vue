<template>
  <div class="bg-login">
    <main class="form-signin">
      <h1 class="app-title">Ecommerce</h1>
      <form @submit.prevent="login">
        <h1 class="h3 mb-3 fw-normal">Admin Login</h1>
        <label for="inputemail" class="visually-hidden">email address:</label>
        <input
          type="email"
          class="form-control"
          placeholder="email address"
          v-model="inputEmail"
          required
          autofocus
        />
        <label for="inputpassword" class="visually-hidden">password:</label>
        <input
          type="password"
          class="form-control"
          placeholder="password"
          v-model="inputPassword"
          required
        />
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputEmail: '',
      inputPassword: ''
    }
  },

  methods: {
    login () {
      const data = {
        email: this.inputEmail,
        password: this.inputPassword
      }

      this.$store
        .dispatch('login', data)
        .then(() => {
          this.inputEmail = ''
          this.inputPassword = ''
        })
    }
  }
}
</script>

<style>
.bg-login {
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.bg-login p {
  font-size: 15px;
}

.bg-login .app-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
