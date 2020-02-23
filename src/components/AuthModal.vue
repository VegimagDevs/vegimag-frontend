<template>
  <div>
    <v-btn text @click.stop="openDialog('sign-up')" class="mr-4">
      {{ $t('auth.sign-up') }}
    </v-btn>
    <v-btn color="primary" @click.stop="openDialog('sign-in')">
      {{ $t('auth.sign-in') }}
    </v-btn>
    <v-dialog v-model="authDialog" max-width="600">
      <SignIn
        v-if="currentDialog == 'sign-in'"
        @sign-up="openDialog('sign-up')"
      ></SignIn>
      <SignUp
        v-if="currentDialog == 'sign-up'"
        @sign-in="openDialog('sign-in')"
        @verify-email="openDialog('verify-email')"
      ></SignUp>
      <VerifyEmail v-if="currentDialog == 'verify-email'" @close="closeDialog">
      </VerifyEmail>
    </v-dialog>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import VerifyEmail from '@/components/VerifyEmail.vue'

export default {
  name: 'AuthModal',

  components: {
    SignIn,
    SignUp,
    VerifyEmail
  },

  data: () => ({
    authDialog: false,
    currentDialog: ''
  }),

  methods: {
    openDialog(dialogName) {
      this.authDialog = true
      this.currentDialog = dialogName
    },

    closeDialog() {
      this.authDialog = false
    }
  }
}
</script>
