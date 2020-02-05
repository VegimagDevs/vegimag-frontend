<template>
  <div>
    <v-btn text @click.stop="openSignUpDialog()" class="mr-4"> Sign Up </v-btn>
    <v-btn color="primary" @click.stop="openSignInDialog()"> Sign In </v-btn>
    <v-dialog v-model="authDialog" max-width="600">
      <SignIn v-if="signInDialog" @sign-up="signInDialog = false"></SignIn>
      <SignUp v-else @sign-in="signInDialog = true"></SignUp>
    </v-dialog>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'AuthModal',

  components: {
    SignIn,
    SignUp
  },

  data: () => ({
    authDialog: false,
    signInDialog: false
  }),

  methods: {
    openSignInDialog() {
      this.authDialog = true
      this.signInDialog = true
    },
    openSignUpDialog() {
      this.authDialog = true
      this.signInDialog = false
    }
  }
}
</script>
