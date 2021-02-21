<template>
  <div>
    <div class="borderTop" v-if="user[0].userId !== null">
        <router-link class="linkborderTop" to="/article/new"><i class="fas fa-plus"></i> Ajouter un article</router-link>
    </div>
    <div class="divTop">
      <h2>Article</h2>
      <div class="col-12 col-sm-10 col-md-7 col-lg-6" v-for="article in articles" :key="article">
        <router-link class="linkCard" :to="{ name: 'View article', params: { id: article.id }}">
          <div class="cardArticle">
            <span>{{ decodeURIComponent(article.title) }}</span>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-sm-10 col-md-7 col-lg-6" v-for="articleShare in articlesShare" :key="articleShare">
        <a class="linkCard" :href="decodeURIComponent(articleShare.link_share)" target="_blank">
          <div class="cardArticle">
            <span>{{ decodeURIComponent(articleShare.title_share) }}</span>
          </div>
        </a>
      </div>
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
        title: null
      }],
      articlesShare: [{
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
        this.error = '404'
        this.$store.state.load = false
      })
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
}

.linkborderTop {
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

.linkCard {
  font-weight: bold;
  font-size: 1.5rem;
  color: #383838;
  text-decoration: none;
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
}
</style>
