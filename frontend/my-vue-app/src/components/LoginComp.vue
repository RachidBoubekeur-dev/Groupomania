<template>
  <div class="row">
    <div class="jumbotron p-4 p-md-5 col-xs-12 col-sm-10 col-lg-7 col-xl-5">
      <h1>Connexion</h1>
      <form @submit.prevent="formLogin">
        <span class="text-danger font-weight-bold">{{ error }}</span><br />
        <div>
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email" aria-describedby="email" aria-label="Votre email" placeholder="Votre email" required/><br />
          <label for="password">Mot de passe:</label>
          <input type="password" name="password" v-model="password" aria-describedby="password" aria-label="Votre mot de passe" placeholder="Votre mot de passe" required/>
        </div>
        <input type="submit" id="submit" value="Valider" />
      </form>
    </div>
    <router-link to="/signup" class="signup">Pas encore de compte ? <strong>Inscrivez-vous</strong></router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginComp',
  data () {
    return {
      email: null,
      password: null,
      error: null
    }
  },
  methods: {
    formLogin () {
      this.$store.state.load = true
      const dataLogin = {
        email: encodeURIComponent(this.email),
        password: encodeURIComponent(this.password)
      }
      // On envoie les données à l'action dans le store vuex
      this.$store.dispatch('loginUser', dataLogin)
        .then(() => { window.location.href = '/profil' })
        .catch(error => {
          this.$store.state.load = false
          if (error !== 'Connexion impossible') {
            this.error = 'Identifiant incorrect'
          } else {
            this.error = error
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../sass/_variables';
div:nth-child(1) {
  display: flex;
  margin: auto;
  flex-direction: column;
}
.jumbotron {
  text-align: center;
  border: 3px solid $color1;
  border-radius: 11px;
  background-color: rgb(255, 255, 255);
  margin: auto;
  padding-top: 2rem !important;
}

form {
  text-align: center;
  label {
    font-weight: bold;
    font-size: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  input {
    border: 2px solid $color1;
    border-radius: 2px;
    height: 35px;
    outline: none;
  }

  #submit {
    background-color: $color1;
    color: white;
    border: none;
    margin-top: 2.5rem;
    width: 100px;
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
}

div:nth-child(3) {
  width: fit-content;
  text-align: right;
}

.signup {
  text-decoration: underline;
  color: $color3;
  font-size: 1.1rem;
  margin-top: 0.6rem;
  &:hover{
    color: $color1;
  }
}

@media screen and (max-width: 438px) {
  div:nth-child(3) {
    margin-right: 13%;
    margin-left: 13%;
  }
}
</style>
