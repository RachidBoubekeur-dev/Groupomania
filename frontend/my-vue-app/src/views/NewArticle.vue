<template>
  <div>
    <NewArticleComp />
  </div>
</template>

<script>
// @ is an alias to /src
import NewArticleComp from '@/components/NewArticleComp.vue'

export default {
  name: 'Ajouter un article',
  components: {
    NewArticleComp
  },
  beforeRouteEnter (to, from, next) {
    const userId = localStorage.getItem('userId')
    if (userId !== null) next()
    else next('/article')
  }
}
</script>
