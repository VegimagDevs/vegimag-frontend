<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="3">
        <v-img src="../assets/beans-in-bowls.jpg" height="100%"></v-img>
      </v-col>
      <v-col cols="9" class="pa-3">
        <h1 class="title mt-12 mb-8">Sign up</h1>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="userName"
            :error-messages="userNameErrors"
            :counter="50"
            label="User name"
            required
            outlined
            @input="$v.userName.$touch()"
            @blur="$v.userName.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Email"
            required
            outlined
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            type="password"
            label="Password"
            required
            outlined
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          >
            <template v-slot:append>
              <v-progress-circular
                size="24"
                width="3"
                :color="scoreColor"
                :value="(scoreValue * 100) / 4"
              ></v-progress-circular>
            </template>
          </v-text-field>
          <v-row>
            <v-col cols="12">
              <v-btn
                type="submit"
                color="primary"
                :disabled="$v.$invalid"
                class="ml-2"
              >
                Sign Up
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="end">
          <v-col class="text-right">
            <a @click="signIn">Already registered? Sign In </a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import zxcvbn from 'zxcvbn'
import { throttle } from 'lodash-es'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',

  components: {},

  mixins: [validationMixin],

  validations: {
    userName: { required, maxLength: maxLength(50) },
    email: { required, email },
    password: {
      required,
      score() {
        return this.scoreValue > 1
      }
    }
  },

  data: () => ({
    userName: '',
    email: '',
    password: '',
    scoreValue: 0
  }),

  watch: {
    password: 'testPassword'
  },

  computed: {
    // shortcut for scoreColor: function() {}
    scoreColor() {
      switch (this.scoreValue) {
        case 0:
          return 'error'
        case 1:
          return 'error'
        case 2:
          return 'warning'
        case 3:
          return 'warning'
        case 4:
          return 'success'
        default:
          return 'error'
      }
    },
    userNameErrors() {
      const errors = []
      if (!this.$v.userName.$dirty) return errors
      if (!this.$v.userName.maxLength) {
        errors.push('User name must be at most 50 characters long')
      }
      if (!this.$v.userName.required) {
        errors.push('User name is required.')
      }
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      if (!this.$v.email.email) {
        errors.push('Must be valid e-mail')
      }
      if (!this.$v.email.required) {
        errors.push('E-mail is required')
      }
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) {
        errors.push('Password is required')
      }
      if (!this.$v.password.score) {
        errors.push('Password is not strong enough')
      }
      return errors
    }
  },

  methods: {
    signIn() {
      this.$emit('sign-in')
    },
    testPassword: throttle(function() {
      let results = zxcvbn(this.password)
      this.scoreValue = results.score
    }, 100),
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isDisabled = false
      }
    }
  }
}
</script>
