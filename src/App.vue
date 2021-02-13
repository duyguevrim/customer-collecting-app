<template>
  <div >
    <header role="banner" style="display: flex;" v-if="currentUser" >
      <h1><a class="text-decoration-none">
<!--        logo -->
<!--        <img src=""/>-->
      </a></h1>
      <div v-if="currentUser" class="ml-auto d-flex align-items-center">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user"/>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt"/>
            Çıkış Yap
          </a>
        </li>

      </div>
    </header>

    <nav v-if="currentUser" role='navigation'>


      <ul class="main">

        <li class="write py-3 pl-2"><a class="text-decoration-none text-white">
          <router-link to="/musteriler" class="nav-link">
            <div class="d-flex align-items-center color-white">
              <v-icon name="home" style="width: 26px;"></v-icon>
              <p class="menu-option-title m-0 pl-2">Müşteriler</p>
            </div>
          </router-link>
        </a></li>
        <li class="write py-3 pl-2"><a class="text-decoration-none text-white">
          <router-link to="/rapor" class="nav-link">
            <div class="d-flex align-items-center color-white">
              <v-icon name="activity" style="width: 26px;"></v-icon>
              <p class="menu-option-title m-0 pl-2">Tahsilat Oranı</p>
            </div>
          </router-link>
        </a></li>

      </ul>
    </nav>


    <main v-if="currentUser">

      <div class="pt-5 m-0">

        <router-view/>
      </div>


    </main>

    <div v-if="!currentUser">
      <LoginPage />
    </div>
  </div>
</template>

<script>
import LoginPage from "@/views/LoginPage";
export default {
  components:{
    LoginPage,
  },
  data() {
    return {
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showKullaniciBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_USER');
      }

      return false;
    },

  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {

  }
};
</script>

<style>
.color-white {
  color: white !important;
}
.nav-link{
  color: #1b4989 !important;
}
main {
  margin-left: 300px;
}

html {
  box-sizing: border-box;
}

/* header */
header[role="banner"] {
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
}

header[role="banner"] h1 {
  margin: 0;
  font-weight: 300;
  padding: 1rem;
}

header[role="banner"] .utilities {
  width: 100%;
  background: slategray;
  color: #ddd;
}

header[role="banner"] .utilities li {
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
}

header[role="banner"] .utilities li a {
  padding: 0.7em;
  display: block;
}

/* header */
.utilities a:before {
  font-family: FontAwesome;
  padding-right: 0.6em;
}

nav[role="navigation"] {
  background: #1b4989;
  color: #ddd;
  /* icons */
}

nav[role="navigation"] li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

nav[role="navigation"] li a {
  color: #ddd;
  text-decoration: none;
  display: block;
  padding: 0.7em;
}

nav[role="navigation"] li a:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

nav[role="navigation"] li a:before {
  font-family: FontAwesome;
  padding-right: 0.6em;
}

footer[role="contentinfo"] {
  background: slategray;
  color: #ddd;
  font-size: 0.8em;
  text-align: center;
  padding: 0.2em;
}

ul,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

main li {
  position: relative;
  padding-left: 1.2em;
  margin: 0.5em 0;
}

@media screen and (min-width: 600px) {
  html,
  body {
    height: 100%;
  }

  header[role="banner"] {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    height: 75px;
  }

  header[role="banner"] .utilities {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    color: darkslategray;
    width: auto;
  }

  nav[role="navigation"] {
    position: fixed;
    width: 300px;
    top: 75px;
    bottom: 0px;
    left: 0px;
  }

}

.menu-option-title {
  font-size: 1.175rem !important;
  color: white !important;
}

</style>
