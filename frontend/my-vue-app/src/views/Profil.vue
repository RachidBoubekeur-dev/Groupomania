<template>
  <div>
    <ProfilComp />
  </div>
</template>

<script>
// @ is an alias to /src
import ProfilComp from '@/components/ProfilComp.vue'

export default {
  name: 'Profil',
  components: {
    ProfilComp
  },
  beforeRouteEnter (to, from, next) {
    const userId = localStorage.getItem('userId')
    if (userId !== null) next()
    else next('/login')
  }
}
</script>
