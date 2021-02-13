<template>
  <div>
    <header>
        <nav id="nav" class="navbar navbar-expand-md navbar-light bg-white">
          <router-link to="/" class="mr-md-5"><img src="./assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" /></router-link>
          <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-center" id="collapsibleNavId">
            <ul class="nav justify-content-center">
                <li class="nav-item">
                  <router-link to="/" class="nav-link active">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/chat" class="nav-link">Chat</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/article" class="nav-link">Article</router-link>
                </li>
                <li class="nav-item position-md-absolute right-2">
                  <router-link to="/profil" class="nav-link">Profil</router-link>
                </li>
            </ul>
          </div>
        </nav>
    </header>
    <main class="container">
      <router-view />
    </main>
    <footer>
      <p class="fixed-bottom">© {{ $store.state.year }} Groupomania.</p>
    </footer>
  </div>
</template>

<script>

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202020;
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
  }

  li {
    right: 2%;

    a {
    text-align: center;
    font-weight: bold;
    color: #202020;
    font-size: 1.2em;

    &.router-link-exact-active {
      color: #42b983;
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
