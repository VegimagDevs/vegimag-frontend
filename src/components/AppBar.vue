<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title> Vegimag </v-toolbar-title>
      <v-spacer></v-spacer>
      <AuthModal></AuthModal>
    </v-app-bar>
  </div>
</template>

<script>
import AuthModal from '@/components/AuthModal.vue'

export default {
  name: 'AppBar',

  components: {
    AuthModal
  },

  data: () => ({
    //
  })
}
</script>
