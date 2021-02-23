<template>
  <div class="row">
    <div class="divCard p-4 p-md-5 col-xs-12 col-sm-11 col-lg-8">
      <h1>Mon Profil</h1>
      <span><img src="../assets/default.png" alt="Image user" /></span>
      <div class="divDataUser">
        <p class="mr-5">{{ user[0].name }}</p>
        <p>{{ user[0].email }}</p>
      </div>
      <span class="text-danger font-weight-bold">{{ error }}</span><br />
      <button class="btn btn-danger fw-bold" @click="deleteUser">Supprimer mon compte</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
          window.location.href = '/'
        })
        .catch(() => {
          this.$store.state.load = false
          this.error = 'La suppression de votre compte a échoué'
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../sass/_variables';
div:nth-child(1) {
  margin: auto;
}

.divCard {
  text-align: center;
  box-shadow: 0px 4px 25px -13px #9a9a9a;
  padding-top: 2rem !important;
  margin-top: 100px;
  border: 5px solid #494949;
  border-radius: 17px;
  margin: auto;
  & > h1 {
    font-weight: bold;
    font-size: 2.2rem;
    color: #383838;
  }
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
  & > p {
    font-weight: bold;
    font-size: 1.3rem;
    color: #383838;
    margin-left: 1rem;
    margin-right: 1rem;
    display: inline-block;
    overflow-wrap: anywhere;
  }
}

button {
  margin-top: 10px;
}
</style>
