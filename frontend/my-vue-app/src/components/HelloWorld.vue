<template>
  <div>
    <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania">
    <h1>Bienvenue au réseau social interne de l'entreprise 😄</h1>
    <h2>Le but de cet outil est de faciliter les interactions entre collègues alors faites vous plaîsirs 🥳</h2>
  </div>
  <div>
    <p class="fixed-bottom font-weight-bold">© {{ year }} Groupomania.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      year: (new Date()).getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
  margin-top: 5rem;
  width: 75%;
  max-width: 500px;
}

h1 {
  color: #389b6e;
  font-size: 200%;
  margin-top: 3rem;
}

h2 {
  color: #202020;
  font-size: 180%;
  margin-top: 1.5rem;
}
</style>
