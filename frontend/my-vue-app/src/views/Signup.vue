<template>
  <div>
    <SignupComp />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupComp from '@/components/SignupComp.vue'

export default {
  name: 'Signup',
  components: {
    SignupComp
  },
  beforeRouteEnter (to, from, next) {
    const userId = localStorage.getItem('userId')
    if (userId === null) next()
    else next('/profil')
  }
}
</script>
