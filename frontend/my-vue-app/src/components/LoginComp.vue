<template>
  <div class="row">
    <div class="divCard p-4 p-md-5 col-xs-12 col-sm-10 col-lg-7 col-xl-5">
      <h1>Connexion</h1>
      <form @submit.prevent="formLogin">
        <span class="text-danger font-weight-bold">{{ error }}</span><br />
        <div>
          <label class="form-label" for="email">Email:</label>
          <input class="form-control" type="email" name="email" v-model="email" aria-describedby="email" aria-label="Votre email" placeholder="Votre email" required/><br />
          <label class="form-label" for="password">Mot de passe:</label>
          <input class="form-control" type="password" name="password" v-model="password" aria-describedby="password" aria-label="Votre mot de passe" placeholder="Votre mot de passe" required/>
        </div>
        <button class="btn btn-success fw-bold mt-4" type="submit">Valider</button>
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

form {
  text-align: center;
  label {
    font-weight: bold;
    font-size: 1.2rem;
    color: #383838;
    margin-right: 1rem;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
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
