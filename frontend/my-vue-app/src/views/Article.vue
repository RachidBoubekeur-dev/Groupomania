<template>
  <div class="home">
    <ArticleComp />
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleComp from '@/components/ArticleComp.vue'

export default {
  name: 'Article',
  components: {
    ArticleComp
  }
}
</script>
