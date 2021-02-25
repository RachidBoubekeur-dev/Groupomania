<template>
  <div>
    <ShareArticleComp />
  </div>
</template>

<script>
// @ is an alias to /src
import ShareArticleComp from '@/components/ShareArticleComp.vue'

export default {
  name: 'Partager un article',
  components: {
    ShareArticleComp
  },
  beforeRouteEnter (to, from, next) {
    const userId = localStorage.getItem('userId')
    if (userId !== null) next()
    else next('/article')
  }
}
</script>
