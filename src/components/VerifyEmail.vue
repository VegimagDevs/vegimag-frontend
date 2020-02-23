<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="3">
        <v-img src="../assets/beans-in-bowls.jpg" height="100%"></v-img>
      </v-col>
      <v-col cols="9" class="pa-3">
        <h1 class="title mt-12 mb-8">{{ $t('auth.verify-email') }}</h1>
        <v-row>
          <v-col v-html="$t('auth.check-email')"></v-col>
        </v-row>
        <v-row class="text-right">
          <v-col>
            <v-btn color="primary" @click="close">
              {{ $t('general.ok') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'VerifyEmail',

  components: {},

  data: () => ({}),

  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
