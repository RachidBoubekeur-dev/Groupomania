<template>
  <div>
    <LoginComp />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComp from '@/components/LoginComp.vue'

export default {
  name: 'Login',
  components: {
    LoginComp
  },
  beforeRouteEnter (to, from, next) {
    const userId = localStorage.getItem('userId')
    if (userId === null) next()
    else next('/profil')
  }
}
</script>
