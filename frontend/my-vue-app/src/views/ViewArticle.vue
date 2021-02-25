<template>
  <div>
    <ViewArticleComp />
  </div>
</template>

<script>
// @ is an alias to /src
import ViewArticleComp from '@/components/ViewArticleComp.vue'

export default {
  name: 'Article',
  components: {
    ViewArticleComp
  }
}
</script>
