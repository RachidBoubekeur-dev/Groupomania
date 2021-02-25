<template>
  <div class="row">
    <div class="divCard p-4 p-md-5 col-xs-12 col-sm-11 col-lg-8 col-xl-6">
      <h1>Inscription</h1>
      <form @submit.prevent="formSignup">
        <span class="text-danger font-weight-bold">{{ error }}</span><br />
        <div>
          <label class="form-label" for="name">Nom d'utilisateur:</label>
          <input class="form-control" type="text" name="name" v-model="name" aria-describedby="name" aria-label="Nom d'utilisateur" placeholder="Nom d'utilisateur" minlength="3" maxlength="50" pattern="^[a-z ,.'-éèàâêûîôäëüïöù][^0-9]+$" required/><br />
          <label class="form-label" for="email">Email:</label>
          <input class="form-control" type="email" name="email" v-model="email" aria-describedby="email" aria-label="Votre email" placeholder="Votre email" minlength="6" maxlength="50" required/><br />
          <label class="form-label" for="password">Mot de passe:</label>
          <input class=form-control type="password" name="password" v-model="password" aria-describedby="password" aria-label="Votre mot de passe" placeholder="Votre mot de passe" minlength="8" maxlength="100" required/>
        </div>
        <button class="btn btn-success fw-bold mt-4" type="submit">Valider</button>
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
      this.$store.state.load = true
      if (this.name.length >= 3 && this.name.length <= 50 && this.regex.test(this.name)) {
        if (this.email.length >= 6 && this.name.length <= 50 && this.regexEmail.test(this.email)) {
          if (this.password.length >= 8 && this.name.length <= 100) {
            const dataSignup = {
              name: encodeURIComponent(this.name),
              email: encodeURIComponent(this.email),
              password: encodeURIComponent(this.password)
            }
            // On envoie les données à l'action signupUser dans le store vuex
            this.$store.dispatch('signupUser', dataSignup)
              .then(() => {
                // Si c'est valider on envoie les données à l'action loginUser dans le store vuex
                this.$store.dispatch('loginUser', dataSignup)
                  .then(() => { window.location.href = '/profil' })
                  .catch(() => {
                    this.$store.state.load = false
                    this.error = 'Votre inscription n\'a pas pu être effectuée'
                  })
              })
              .catch(error => {
                this.$store.state.load = false
                if (error !== 'Votre inscription n\'a pas pu être effectuée') {
                  this.error = 'Cet email est déjà utilisé'
                } else {
                  this.error = error
                }
              })
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

h1{
  margin-bottom: 1rem;
}

form {
  text-align: center;
  label {
    font-weight: bold;
    font-size: 1.2rem;
    color: #383838;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: inline-block;
  }
  input {
    height: 40px;
    width: auto;
    display: inline-block;
    &:focus {
      border-color: rgba(66, 185, 131, 0.5);
      box-shadow: 0 0 0 0.25rem rgba(66, 185, 131, 0.5);
    }
  }
  button {
    font-size: 1.1rem
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
