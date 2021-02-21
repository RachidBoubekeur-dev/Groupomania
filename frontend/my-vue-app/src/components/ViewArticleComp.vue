<template>
  <div>
    <div class="borderTop">
      <router-link to="/article"><i class="fas fa-hand-point-left"></i></router-link>
      <span v-if="article.date !== undefined"><small>fait le</small>{{ article.date }}</span>
    </div>
    <div v-if="error !== null">
        <h2 class="text-danger align-center">{{ error }}</h2>
    </div>
    <div class="divContent" v-if="article.content !== undefined">
        <h2>{{ decodeURIComponent(article.title) }}</h2>
        {{ decodeURIComponent(article.content).split('<br />').join(' ') }}
    </div>
    <div class="divButton">
        <button v-if="article.userId == user[0].userId" class="btn btn-warning"><router-link class="text-white text-decoration-none" :to="{ name: 'Modifier un article', params: { id: article.id }}">Modifier</router-link></button>
        <button v-if="article.userId == user[0].userId || user[0].userId === 0" @click="deleteArticle" class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '../router'

export default {
  name: 'ViewArticleComp',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      article: [{
        id: window.location.href.split('/')[4],
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
    this.$store.dispatch('getOneArticle', this.article[0].id)
      .then(response => {
        this.$store.state.load = false
        this.article = response.data.response[0]
      })
      .catch(() => {
        this.$store.state.load = false
        this.error = 'Une erreur s\'est produit lors du chargement de l\'article'
      })
  },
  methods: {
    deleteArticle () {
      this.$store.state.load = true
      this.$store.dispatch('deleteArticle', this.article.id)
        .then(() => {
          this.$store.state.load = false
          router.push({ name: 'Article' })
        })
        .catch(() => {
          this.$store.state.load = false
          this.error = 'Une erreur s\'est produit lors de la suppression de votre article'
        })
    }
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
      & > small {
        font-size: 19px;
        margin-right: 10px;
      }
    }
  }
  & > .divContent {
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
  & > .divButton {
    margin-bottom: 3rem;
    text-align: right;
    & > button {
        font-size: 1.3rem;
    }
    & > button:nth-child(1) {
        margin-right: 1rem;
    }
  }
}
</style>
