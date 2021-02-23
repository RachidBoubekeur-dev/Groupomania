<template>
  <div>
    <header>
        <nav id="nav" class="navbar navbar-expand-md navbar-light bg-white">
          <router-link to="/"><img src="./assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" /></router-link>
          <button class="navbar-toggler m-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-center" id="collapsibleNavId">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                  <router-link to="/" class="nav-link active">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/article" class="nav-link">Article</router-link>
                </li>
                <li class="nav-item position-md-absolute right-2" v-if="user[0].userId !== null">
                  <router-link to="/profil" class="nav-link">Profil</router-link>
                </li>
                <li class="nav-item position-md-absolute right-2" v-else>
                  <router-link to="/login" class="nav-link">Login</router-link>
                </li>
            </ul>
          </div>
        </nav>
    </header>
    <main class="container">
      <router-view />
    </main>
    <div v-if="load" class="spinner-border text-success fixed-bottom m-2" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['load', 'user'])
  }
}
</script>

<style lang="scss">
@import './sass/_variables';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color1;
}

#nav {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.15);
  margin-bottom: 5%;

  img {
    text-align: left;
    width: 200px;
    margin-left: 0.5rem;
    margin-right: 1.5rem;
  }

  li {
    right: 2%;
    & > .nav-link {
    text-align: center;
    font-weight: bold;
    color: $color1;
    font-size: 1.2em;

    &.router-link-exact-active {
      color: $color2;
    }
  }
  }
}
@media(min-width: 768px) {
  .position-md-absolute {
    position: absolute;
  }
}
</style>
