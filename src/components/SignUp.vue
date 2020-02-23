<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="3">
        <v-img src="../assets/beans-in-bowls.jpg" height="100%"></v-img>
      </v-col>
      <v-col cols="9" class="pa-3">
        <h1 class="title mt-12 mb-8">{{ $t('auth.sign-up') }}</h1>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            :counter="50"
            :label="$t('auth.username')"
            required
            outlined
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            :label="$t('auth.email')"
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
            :label="$t('auth.password')"
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
                {{ $t('auth.sign-up') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="end">
          <v-col class="text-right">
            <a @click="signIn">{{ $t('auth.already-registered') }}</a>
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
    username: { required, maxLength: maxLength(50) },
    email: { required, email },
    password: {
      required,
      score() {
        return this.scoreValue > 1
      }
    }
  },

  data: () => ({
    username: '',
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

    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      if (!this.$v.username.maxLength) {
        errors.push(this.$t('auth.errors.username-length'))
      }
      if (!this.$v.username.required) {
        errors.push(this.$t('auth.errors.username-required'))
      }
      return errors
    },

    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      if (!this.$v.email.email) {
        errors.push(this.$t('auth.errors.email-valid'))
      }
      if (!this.$v.email.required) {
        errors.push(this.$t('auth.errors.email-required'))
      }
      return errors
    },

    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) {
        errors.push(this.$t('auth.errors.password-required'))
      }
      if (!this.$v.password.score) {
        errors.push(this.$t('auth.errors.password-strength'))
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

    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      await this.$store.dispatch('authSignUp', {
        email: this.email,
        username: this.username,
        password: this.password
      })

      this.$emit('verify-email')
    }
  }
}
</script>
