<template>
  <div class="row">
    <div class="jumbotron p-4 p-md-5 col-xs-12 col-sm-11 col-lg-8">
      <h1>Mon Profil</h1>
      <span><img src="../assets/profil/default.png" alt="Image user" /></span>
      <div class="divDataUser">
        <p class="mr-5">Rachid Boubekeur</p>
        <p>rachidboubekeur@free.fr</p>
      </div>
      <form enctype="multipart/form-data">
        <button class="mr-5">Modifier ma photo de profil</button>
        <button>Supprimer mon compte</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilComp'
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
    font-size: 1.3rem;
    display: inline-block;
  }
}

button {
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
