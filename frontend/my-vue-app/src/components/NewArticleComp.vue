<template>
  <div>
      <div class="borderTop">
          <router-link to="/article/share"><i class="fas fa-plus"></i> Partager un article</router-link>
      </div>
      <h2>Ajouter un article</h2>
  </div>
</template>

<script>
export default {
  name: 'NewArticleComp'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../sass/_variables';

.borderTop {
  background: linear-gradient(279deg, #277a55, #309266, #369d6e,#3cad7a);
  height: 39px;
  width: 100%;
  position: absolute;
  left: 0px;
  margin-top: -5%;
  padding-right: 2.5%;
  padding-top: 2px;
  transition: all 1s;
}

a {
  color: white;
  position: absolute;
  right: 2%;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    .fa-plus {
      transition: all 3s;
      transform: rotate(360deg);
    }
  }
  .fa-plus {
    font-size: 1.2rem;
    margin-right: 3.5px;
    transition: all 3s;
    transform: rotate(-360deg);
  }
}
</style>
