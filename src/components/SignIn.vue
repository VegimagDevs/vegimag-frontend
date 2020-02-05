<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="3">
        <v-img src="../assets/beans-in-bowls.jpg" height="100%"></v-img>
      </v-col>
      <v-col cols="9" class="pa-3">
        <h1 class="title mt-12 mb-8">Sign in</h1>
        <v-form>
          <v-text-field label="Email" outlined> </v-text-field>
          <v-text-field type="password" label="Password" outlined>
          </v-text-field>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary"> Sign In </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col>
            <a> Forgot password? </a>
          </v-col>
          <v-col class="text-right">
            <a @click="signUp()"> Sign Up </a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'SignIn',

  components: {},

  data: () => ({}),

  methods: {
    signUp() {
      this.$emit('sign-up')
    }
  }
}
</script>
