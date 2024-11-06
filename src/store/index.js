import Vue from 'vue'
import Vuex from 'vuex'

// configure a persistence state (save in browser storage)
import VuexPersistence from 'vuex-persist'

// modules
import locale from './locale'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'portfolio',
  reducer: state => ({
    locale: state.locale
  }),
})

export default new Vuex.Store({
  modules: {
    locale: locale,
  },
  plugins: [vuexLocal.plugin],
});
