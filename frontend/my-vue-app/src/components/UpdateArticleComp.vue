<template>
  <div>
      <div class="borderTop">
          <router-link :to="{ name: 'View article', params: { id: article.id }}"><i class="fas fa-plus"></i> Annuler</router-link>
      </div>
      <div class="divCard col-12 col-sm-10 col-lg-9">
        <h2>Modifier mon article</h2>
        <span class="text-danger font-weight-bold">{{ error }}</span>
        <form class="row g-3 needs-validation" @submit.prevent="formUpdateArticle">
          <div class="col-11 col-md-9 col-lg-8">
            <label for="titre" class="form-label">Titre:</label>
            <input type="text" v-model="article.title" class="form-control" aria-describedby="titre" aria-label="Titre de l'article" placeholder="Titre de l'article" name="titre" minlength="5" maxlength="50" pattern="^[a-z ,.'-éèàâêûîôäëüïöù]+$" required /><br />
            <label for="content" class="form-label">Article:</label>
            <small>min 500 caractères & max 2000 caractères</small>
            <editor
            apiKey="3fe46kfdohw7u3rygxo5dc4j8yvfkod44txki5valjb7hae4"
            v-model="article.content"
            :init="{
              height: 200,
              menubar: false,
              forced_root_block: false,
              force_br_newlines: false,
              force_p_newlines: false,
              valid_elements: '',
              plugins: [
                'advlist autolink lists link image charmap',
                'searchreplace visualblocks code fullscreen',
                'print preview anchor insertdatetime media',
                'paste code help wordcount table'
              ],
              toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help'
            }">
          </editor>
        </div>
        <div class="col-12">
          <button class="btn btn-warning text-white" type="submit">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'UpdateArticleComp',
  components: {
    editor: Editor
  },
  data () {
    return {
      article: [{
        id: window.location.href.split('/')[5],
        userId: null,
        title: null,
        content: null
      }],
      regex: /^[a-z ,.'-éèàâêûîôäëüïöù]+$/,
      error: null
    }
  },
  mounted () {
    this.$store.state.load = true
    this.$store.dispatch('getOneArticle', this.article[0].id)
      .then(response => {
        this.$store.state.load = false
        this.article = response.data.response[0]
        this.article.title = decodeURIComponent(this.article.title)
        this.article.content = decodeURIComponent(this.article.content)
        if (this.article.userId.toString() !== this.$store.state.user[0].userId) this.$router.push({ path: '/article' })
      })
      .catch(() => {
        this.$store.state.load = false
        this.$router.push({ path: '/article' })
      })
  },
  methods: {
    formUpdateArticle () {
      this.$store.state.load = true
      if (this.article.title.length >= 5 && this.article.title.length <= 50 && this.regex.test(this.article.title)) {
        if (this.article.content.length >= 500 && this.article.content.length >= 2000) {
          const dataArticle = {
            id: this.article.id,
            title: encodeURIComponent(this.article.title),
            content: encodeURIComponent(this.article.content)
          }
          // On envoie les données à l'action updateArticle dans le store vuex
          this.$store.dispatch('updateArticle', dataArticle)
            .then(() => { this.$router.push({ path: `/article/${this.article.id}` }) })
            .catch(() => {
              this.$store.state.load = false
              this.error = 'Votre article n\'a pas pu être modifier'
            })
        } else {
          this.$store.state.load = false
          this.error = 'Votre article doit contenir min 500 caractères & max 2000 caractères'
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
  text-align: -webkit-center;
}
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
  & > a {
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

h2 {
  font-weight: bold;
  font-size: 2.1rem;
  color: #383838;
}

.divCard {
  border-radius: 17px;
  box-shadow: 0px 4px 25px -13px #9a9a9a;
  padding-bottom: 61px;
  margin-top: 100px;
  padding-top: 55px;
  border: 5px solid #494949;
  margin-bottom: 12%;
}

form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  div:nth-child(1) {
    text-align: justify;
    label {
      font-weight: bold;
      font-size: 1.4rem;
      color: #383838;
      margin-right: 1rem;
    }
    input {
      display: inline-block;
      margin-bottom: 2rem;
      &:focus {
        border-color: rgba(66, 185, 131, 0.5);
        box-shadow: 0 0 0 0.25rem rgba(66, 185, 131, 0.5);
      }
    }
  }
  button {
    width: 100px;
    font-size: 1.1rem;
    margin-top: 2rem;
    font-weight: bold;
  }
}
</style>
