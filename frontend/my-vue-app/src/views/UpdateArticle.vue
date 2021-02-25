<template>
  <div>
    <UpdateArticleComp />
  </div>
</template>

<script>
// @ is an alias to /src
import UpdateArticleComp from '@/components/UpdateArticleComp.vue'

export default {
  name: 'Modifier un article',
  components: {
    UpdateArticleComp
  },
  beforeRouteEnter (to, from, next) {
    const userId = localStorage.getItem('userId')
    if (userId !== null) next()
    else next('/article')
  }
}
</script>
