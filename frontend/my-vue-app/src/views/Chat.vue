<template>
  <div>
    <ChatComp />
  </div>
</template>

<script>
// @ is an alias to /src
import ChatComp from '@/components/ChatComp.vue'

export default {
  name: 'Chat',
  components: {
    ChatComp
  }
}
</script>
