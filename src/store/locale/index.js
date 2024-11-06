const locale = {
  state: {
    language: null,
  },
  getters: {
    getLanguage(state) {
      return state.language
    },
  },
  mutations: {
    SET_LANGUAGE(state, language) {
      state.language = language
    },
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
  },
};

export default locale;