<template>
  <div class="row">
    <div class="jumbotron p-4 p-md-5 col-xs-12 col-sm-11 col-lg-8 col-xl-6">
      <h1>Inscription</h1>
      <form @submit.prevent="formSignup">
        <span class="text-danger font-weight-bold">{{ error }}</span><br />
        <div>
          <label for="name">Nom d'utilisateur:</label>
          <input type="text" name="name" v-model="name" aria-describedby="name" aria-label="Nom d'utilisateur" placeholder="Nom d'utilisateur" minlength="3" pattern="^[a-z ,.'-éèàâêûîôäëüïöù][^0-9]+$" required/><br />
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email" aria-describedby="email" aria-label="Votre email" placeholder="Votre email" minlength="6" required/><br />
          <label for="password">Mot de passe:</label>
          <input type="password" name="password" v-model="password" aria-describedby="password" aria-label="Votre mot de passe" placeholder="Votre mot de passe" minlength="8" required/>
        </div>
        <input type="submit" id="submit" value="Valider" />
      </form>
    </div>
    <router-link to="/login" class="signup">Vous avez déjà un compte ? <strong>Connecter-vous</strong></router-link>
  </div>
</template>

<script>
export default {
  name: 'SignupComp',
  data () {
    return {
      name: null,
      email: null,
      password: null,
      regex: /^[a-z ,.'-éèàâêûîôäëüïöù][^0-9]+$/,
      regexEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
      error: null
    }
  },
  methods: {
    formSignup () {
      if (this.name.length >= 3 && this.regex.test(this.name)) {
        if (this.email.length >= 6 && this.regexEmail.test(this.email)) {
          if (this.password.length >= 8) {
            const dataSignup = {
              name: encodeURIComponent(this.name),
              email: encodeURIComponent(this.email),
              password: encodeURIComponent(this.password)
            }
            // On envoie les données à l'action dans le store vuex
            this.$store.dispatch('signupUser', JSON.stringify(dataSignup))
              .then(() => { window.location.href = '/profil' })
              .catch(err => { this.error = err })
          }
        }
      }
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

h1{
  margin-bottom: -1rem;
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
    margin-top: 1.5rem;
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
  margin-top: 0.15rem;
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
