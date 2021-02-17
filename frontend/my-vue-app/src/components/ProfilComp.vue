<template>
  <div class="row">
    <div class="jumbotron p-4 p-md-5 col-xs-12 col-sm-11 col-lg-8">
      <h1>Mon Profil</h1>
      <span><img src="../assets/profil/default.png" alt="Image user" /></span>
      <div class="divDataUser">
        <p class="mr-5">Rachid Boubekeur</p>
        <p>rachidboubekeur@free.fr</p>
      </div>
      <span class="text-danger font-weight-bold">{{ error }}</span><br />
      <button @click="deleteUser">Supprimer mon compte</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilComp',
  data () {
    return {
      error: null
    }
  },
  methods: {
    deleteUser () {
      this.$store.state.load = true
      this.$store.dispatch('deleteUser')
        .then(() => {
          localStorage.clear()
          window.location.href = '/'
        })
        .catch(() => {
          this.$store.state.load = false
          this.error = 'La suppression de votre compte a échoué'
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../sass/_variables';
div:nth-child(1) {
  margin: auto;
}
.jumbotron {
  text-align: center;
  border: 3px solid $color1;
  border-radius: 11px;
  background-color: rgb(255, 255, 255);
  margin: auto;
  padding-top: 2rem !important;
}

img {
  width: 100px;
  border: 2.5px solid $color1;
  border-radius: 75px;
  margin-top: 1.1rem;
}

.divDataUser {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  p {
    font-weight: bold;
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1.3rem;
    display: inline-block;
    overflow-wrap: anywhere;
  }
}

button {
  margin-top: 10px;
  background-color: $color1;
  height: 32px;
  border: 2px solid $color1;
  border-radius: 2.5px;
  color: white;
  cursor: pointer;
  outline: none;
  font-weight: bolder;
  transition: all 0.4s;
  &:hover{
    color: $color1;
    background-color: white;
    border: 2px solid $color1;
  }
}
</style>
