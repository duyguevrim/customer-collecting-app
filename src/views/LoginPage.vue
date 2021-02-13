<template>
  <div>
    <div class="sidenav">
      <div class="login-main-text">
        <h2 class="primary-color font-weight-bold">Tahsilat Portalı<br> Giriş Ekranı</h2>
        <p class="primary-color">Erişmek için buradan giriş yapınız.</p>
        <img src="../assets/login.png" style="width: 100%"/>
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <!--          <p v-if="isLoginPage" @click="registerFormButton">Hesabınız Yok Mu ? Kayıt Olun</p>-->
          <!--          <p v-if="isRegisterPage" @click="loginFromButton">Zaten Hesabınız Var Mı ? Giriş Yapın</p>-->
          <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Kullanıcı Adı</label>
              <input
                  v-model="user.username"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="username"
              />
              <div
                  v-if="errors.has('username')"
                  class="alert alert-danger"
                  role="alert"
              >Kullanıcı Adı Zorunludur!
              </div>
            </div>
            <div class="form-group">
              <label for="password">Parola</label>
              <input
                  v-model="user.password"
                  v-validate="'required'"
                  type="password"
                  class="form-control"
                  name="password"
              />
              <div
                  v-if="errors.has('password')"
                  class="alert alert-danger"
                  role="alert"
              >Parola Zorunludur!
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block login-button font-weight-bold" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span v-if="isLoginPage">Giriş Yap</span>
                <!--                <span v-if="isRegisterPage">Kayıt Ol</span>-->
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import User from '../models/user';

export default {
  name: 'LoginPage',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      isLoginPage: true,
      isRegisterPage: false,

      submitted: false,
      successful: false,

    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.$router.push('/musteriler');
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          );
        }
      });
    },
    handleRegister() {
      this.loading = true;
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
                this.loading = false;
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
.login-button:hover {
  background: #f8f1f1 !important;;
  color: #1b4989 !important;
  border: #f8f1f1 !important;
}

.login-button {
  background: #1b4989 !important;
}

.primary-color {
  color: #1b4989 !important;
}

.sidenav {
  height: 100%;
  background-color: #f8f1f1;
  overflow-x: hidden;
  padding-top: 20px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 30%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }
  .login-form {
    margin-top: 80%;
  }
}
.login-main-text {
  margin-top: 25%;
  padding: 60px;
  color: #fff;
}

</style>
