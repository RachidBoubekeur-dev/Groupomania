<template>
  <div>
    <div class="jumbotron p-4 p-md-5">
      <h1>Connexion</h1>
      <form @submit.prevent="formLogin">
        <span class="text-danger font-weight-bold">{{ error }}</span><br />
        <div class="text-right">
          <label for="email">Email:</label><br />
          <input type="email" name="email" v-model="email" aria-describedby="email" aria-label="Entrez votre email" placeholder="Entrez votre email" required/><br />
          <label for="password">Mot de passe:</label><br />
          <input type="password" name="password" v-model="password" aria-describedby="password" aria-label="Entrez votre mot de passe" placeholder="Entrez votre mot de passe" required/>
        </div>
        <input type="submit" id="submit" value="Valider" />
      </form>
    </div>
    <router-link to="/signup" class="signup">Pas encore de compte ? <strong>inscrivez-vous</strong></router-link>
  </div>
</template>

<script>
// import axios from 'axios'

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
      const dataLogin = {
        email: encodeURIComponent(this.email),
        password: encodeURIComponent(this.password)
      }
      // On envoie les données à l'action dans le store vuex
      this.$store.dispatch('loginUser', JSON.stringify(dataLogin))
        .then(() => { window.location.href = '/profil' })
        .catch(erreur => { this.error = 'Identifiant incorrect' })
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
  background-color: rgb(255, 255, 255);
  margin: auto;
  padding-top: 2rem !important;
}

form {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
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
  }

  #submit {
    background-color: $color1;
    color: white;
    border: none;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
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

.signup {
  text-decoration: underline;
  color: $color3;
  font-size: 1.1rem;
  margin-top: 0.6rem;
  &:hover{
    color: darken($color: $color1, $amount: 0);
  }
}
</style>
