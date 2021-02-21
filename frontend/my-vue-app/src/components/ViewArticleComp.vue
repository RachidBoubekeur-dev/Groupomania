<template>
  <div>
    <div class="borderTop">
      <router-link to="/article"><i class="fas fa-hand-point-left"></i></router-link>
      <span v-if="article.date !== undefined">{{ article.date }}</span>
    </div>
    <div v-if="error !== null">
        <h2 class="text-danger align-center">{{ error }}</h2>
    </div>
    <div v-if="article.content !== undefined">
        <h2>{{ decodeURIComponent(article.title) }}</h2>
        {{ decodeURIComponent(article.content) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewArticleComp',
  data () {
    return {
      id: window.location.href.split('/')[4],
      article: [{
        id: null,
        userId: null,
        title: null,
        content: null,
        date: null
      }],
      error: null
    }
  },
  mounted () {
    this.$store.state.load = true
    this.$store.dispatch('getOneArticle', this.id)
      .then(response => {
        this.$store.state.load = false
        this.article = response.data.response[0]
      })
      .catch(() => {
        this.$store.state.load = false
        this.error = 'Une erreur s\'est produit lors du chargement de l\'article'
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../sass/_variables';
div:nth-of-type(1) {
  text-align: -webkit-center;
  & > .borderTop {
    height: 46px;
    width: 100%;
    position: absolute;
    left: 0px;
    margin-top: -114px;
    padding-right: 2.5%;
    padding-top: 2px;
    transition: all 1s;
    & > a {
      color: #383838;
      position: absolute;
      left: 1.5rem;
      font-size: 1.9rem;
      transition: all 0.6s;
      &:hover {
        left: 1rem;
      }
    }
    & > span {
      color: #383838;
      position: absolute;
      right: 1.5rem;
      font-size: 1.9rem;
      font-weight: bold;
    }
  }
  & > div:nth-of-type(2) {
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 7rem;
    margin-bottom: 4rem;
    text-align: left;
    width: 90%;
    overflow-wrap: break-word;
    & > h2 {
        margin-bottom: 3rem;
        font-weight: bold;
        text-align: center;
    }
  }
}
</style>
