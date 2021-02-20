<template>
  <div>
      <div class="borderTop">
          <router-link to="/article/new"><i class="fas fa-plus"></i> Ajouter un article</router-link>
      </div>
      <div class="divCard col-12 col-sm-10 col-md-7 col-lg-6">
        <h2>Partager un article</h2>
        <span class="text-danger font-weight-bold">{{ error }}</span>
        <form class="row g-3 needs-validation" @submit.prevent="formShareArticle">
        <div class="col-11 col-md-9 col-lg-7">
          <label for="titre" class="form-label">Titre:</label>
          <input type="text" v-model="title" class="form-control" aria-describedby="titre" aria-label="Titre de l'article" placeholder="Titre de l'article" name="titre" minlength="5" maxlength="250" pattern="^[a-z ,.'-éèàâêûîôäëüïöù]+$" required /><br />
          <label for="link" class="form-label">Lien:</label>
          <input type="url" v-model="link" class="form-control" aria-describedby="link" aria-label="Lien de l'article" placeholder="Lien de l'article" name="link" minlength="10" maxlength="500" required />
          </div>
        <div class="col-12">
          <button class="btn btn-success" type="submit">Valider</button>
        </div>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ShareArticleComp',
  data () {
    return {
      title: null,
      link: null,
      regex: /^[a-z ,.'-éèàâêûîôäëüïöù]+$/,
      error: null
    }
  },
  methods: {
    formShareArticle () {
      this.$store.state.load = true
      if (this.title.length >= 5 && this.title.length <= 250 && this.regex.test(this.title)) {
        if (this.link.length >= 10 && this.link.length <= 500) {
          const dataArticle = {
            userId: this.$store.state.user[0].userId,
            title: encodeURIComponent(this.title),
            link: encodeURIComponent(this.link)
          }
          // On envoie les données à l'action shareArticle dans le store vuex
          this.$store.dispatch('shareArticle', dataArticle)
            .then(() => { window.location.href = '/article' })
            .catch(() => {
              this.$store.state.load = false
              this.error = 'L\'article n\'a pas pu être partagé'
            })
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
    }
}
</style>
