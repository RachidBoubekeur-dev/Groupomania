<template>
  <div>
    <div class="borderTop" v-if="user[0].userId !== null">
        <router-link class="linkborderTop" to="/article/new"><i class="fas fa-plus"></i> Ajouter un article</router-link>
    </div>
    <div class="divTop">
      <h2 class="text-danger mt-5">{{ error }}</h2>
      <div v-if="articles !== undefined && articlesShare.length !== 0">
        <h2>Article</h2>
        <div class="col-12 col-sm-10 col-md-7 col-lg-6" v-for="article in articles" :key="article" :id="article.id">
          <div class="cardArticle">
            <router-link class="linkCard" :to="{ name: 'View article', params: { id: article.id }}">
              <span>{{ decodeURIComponent(article.title) }}</span>
            </router-link>
            <router-link v-if="article.userId == user[0].userId" :to="{ name: 'Modifier un article', params: { id: article.id }}"><i class="fas fa-edit text-warning ms-3 mx-2"></i></router-link>
            <i class="fas fa-times text-danger ms-3" @click="deleteArticle(article.id)" v-if="article.userId == user[0].userId || user[0].userId === '0'"></i>
          </div>
        </div>
        <small>Article partager</small>
        <div class="col-12 col-sm-10 col-md-7 col-lg-6" v-for="articleShare in articlesShare" :key="articleShare" :id="articleShare.id_share">
          <div class="cardArticle">
            <a class="linkCard" :href="decodeURIComponent(articleShare.link_share)" target="_blank">
              <span>{{ decodeURIComponent(articleShare.title_share) }}</span>
            </a>
            <i class="fas fa-times text-danger ms-3" @click="deleteArticleShare(articleShare.id_share)" v-if="articleShare.userId_share == user[0].userId || user[0].userId === '0'"></i>
          </div>
        </div>
      </div>
      <h2 v-else>Aucun article publié</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleComp',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      articles: [{
        id: null,
        userId: null,
        title: null
      }],
      articlesShare: [{
        id_share: null,
        userId_share: null,
        title_share: null,
        link_share: null
      }],
      error: null
    }
  },
  mounted () {
    this.$store.state.load = true
    this.$store.dispatch('getArticle')
      .then(response => {
        this.$store.state.load = false
        this.articles = response.data.article
        this.articlesShare = response.data.articleshare
      })
      .catch(() => {
        this.error = 'Une erreur s\'est produit lors de l\'affichage d\'article'
        this.$store.state.load = false
      })
  },
  methods: {
    deleteArticle (id) {
      this.$store.state.load = true
      this.$store.dispatch('deleteArticle', id)
        .then(() => {
          this.$store.state.load = false
          document.getElementById(parseInt(id)).style.display = 'none'
        })
        .catch(() => {
          this.$store.state.load = false
          this.error = 'Une erreur s\'est produit lors de la suppression de votre article'
        })
    },
    deleteArticleShare (idShare) {
      this.$store.state.load = true
      this.$store.dispatch('deleteArticleShare', idShare)
        .then(() => {
          this.$store.state.load = false
          document.getElementById(parseInt(idShare)).style.display = 'none'
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

.borderTop {
  background: linear-gradient(279deg, #277a55, #309266, #369d6e,#3cad7a);
  height: 39px;
  width: 100%;
  position: absolute;
  left: 0px;
  margin-top: -100px;
  padding-right: 2.5%;
  padding-top: 2px;
  transition: all 1s;
  & > .linkborderTop {
    color: white !important;
    position: absolute !important;
    right: 2%;
    left: auto !important;
    font-size: 1.4rem !important;
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
}

div:nth-child(1) {
  text-align: -webkit-center;
}

.divTop {
  margin-top: 100px;
}

h2 {
  font-weight: bold;
  font-size: 2.3rem;
  color: #383838;
  margin-bottom: 30px;
}

.cardArticle {
  border-radius: 2px;
  box-shadow: 0px 4px 25px -13px #9a9a9a;
  margin-top: 10px;
  border: 5px solid #494949;
  margin-bottom: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  transition: all 0.7s;
  &:hover {
    transform: scale(0.98)
  }
  & > .fas {
    font-size: 22px;
    cursor: pointer;
    &:focus {
      outline: -webkit-focus-ring-color auto 1px;
    }
  }
  & > a > .fas {
    font-size: 19px;
    cursor: pointer;
    &:focus {
      outline: -webkit-focus-ring-color auto 1px;
    }
  }
}

.linkCard {
  font-weight: bold;
  font-size: 1.5rem;
  color: #383838;
  text-decoration: none;
}
</style>
