import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#5C2A3F', // red bean purple
        secondary: '#212126', // some dark
        accent: '#8e3b52', // light red bean
        info: '#3A5D8C' // a blue thing
      },
      light: {
        primary: '#5C2A3F', // red bean purple
        secondary: '#212126', // some dark
        accent: '#291924', // really dark bean
        info: '#3A5D8C' // a blue thing
      }
    },
    dark: false
  }
})
