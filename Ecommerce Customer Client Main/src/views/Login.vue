<template>
  <div class="login">
    <div class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center">
            <h2 class="heading-section">Login</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-6">
            <div class="wrap">
              <div class="login-wrap p-4 p-md-2">
                <div class="d-flex">
                </div>
                <form action="#" class="signin-form" @submit.prevent="login">
                  <div class="form-group mt-3">
                    <input type="text" class="form-control" v-model="inputEmail" required>
                    <label class="form-control-placeholder" for="username">Email</label>
                  </div>
                  <div class="form-group">
                    <input id="password-field" type="password" class="form-control" v-model="inputPassword" required>
                    <label class="form-control-placeholder" for="password">Password</label>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary rounded submit px-3">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

<style scoped>
  .login {
    margin-top: 200px;
  }

  .container {
    background-color: bisque;
    border-radius: 30px;
    width: 600px;
  }
</style>
