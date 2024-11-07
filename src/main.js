import Vue from 'vue';

import App from './App.vue';
import router from './router';
import i18n from './i18n';

import mdiVue from 'mdi-vue/v2';
import * as mdijs from '@mdi/js';
import CountryFlag from 'vue-country-flag';

import './assets/main.css';
import store from './store';

Vue.use(mdiVue, {
  icons: mdijs
});

Vue.component('country-flag', CountryFlag);

new Vue({
  router,
  store,
  i18n,
  watch: {
    '$store.getters.getLanguage': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  },
  render: (h) => h(App)
}).$mount('#app');

