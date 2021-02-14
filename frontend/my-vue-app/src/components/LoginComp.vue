<template>
  <div>
    <div class="jumbotron p-3">
      <h1>Connexion</h1>
      <form>
        <label for="email">Email</label><br />
        <input type="email" name="email" aria-describedby="email" aria-label="Entrez votre email" placeholder="Entrez votre email" required/><br />
        <label for="password">Mot de passe</label><br />
        <input type="password" name="password" aria-describedby="password" aria-label="Entrez votre mot de passe" placeholder="Entrez votre mot de passe" required/><br />
        <input type="submit" value="Valider" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComp'
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
  border: 3px solid $color2;
  background-color: white;
  width: 50%;
}
</style>
