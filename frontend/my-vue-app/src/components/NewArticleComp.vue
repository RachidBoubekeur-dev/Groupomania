<template>
  <div>
      <div class="borderTop">
          <router-link to="/article/share"><i class="fas fa-plus"></i> Partager un article</router-link>
      </div>
      <div class="divCard col-12 col-sm-10 col-lg-9">
        <h2>Ajouter un article</h2>
        <span class="text-danger font-weight-bold">{{ error }}</span>
        <form class="row g-3 needs-validation" @submit.prevent="formNewArticle">
          <div class="col-11 col-md-9 col-lg-8">
            <label for="titre" class="form-label">Titre:</label>
            <input type="text" v-model="title" class="form-control" aria-describedby="titre" aria-label="Titre de l'article" placeholder="Titre de l'article" name="titre" minlength="5" maxlength="50" pattern="^[a-z ,.'-éèàâêûîôäëüïöù]+$" required /><br />
            <label for="content" class="form-label">Article:</label>
            <small>min 500 caractères & max 2000 caractères</small>
            <editor
            apiKey="3fe46kfdohw7u3rygxo5dc4j8yvfkod44txki5valjb7hae4"
            v-model="content"
            :init="{
              height: 200,
              menubar: false,
              forced_root_block: false,
              force_br_newlines: true,
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
          <button class="btn btn-success" type="submit">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'NewArticleComp',
  components: {
    editor: Editor
  },
  data () {
    return {
      title: null,
      content: null,
      regex: /^[a-z ,.'-éèàâêûîôäëüïöù]+$/,
      error: null
    }
  },
  methods: {
    formNewArticle () {
      this.$store.state.load = true
      if (this.title.length >= 5 && this.title.length <= 50 && this.regex.test(this.title)) {
        if (this.content.length >= 500 && this.content.length >= 2000) {
          const dataArticle = {
            userId: this.$store.state.user[0].userId,
            title: encodeURIComponent(this.title),
            content: encodeURIComponent(this.content)
          }
          // On envoie les données à l'action newArticle dans le store vuex
          this.$store.dispatch('newArticle', dataArticle)
            .then(() => { window.location.href = '/article' })
            .catch(() => {
              this.$store.state.load = false
              this.error = 'Votre article n\'a pas pu être publié'
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
