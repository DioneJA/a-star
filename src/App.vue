<template>
  <div
    id="app"
    class="w-screen"
    ref="scrollableElement"
  >
    <language-selector/>

    <router-view />
  </div>
</template>

<script>
import { Locales } from './i18n/locales';

export default {
  name: 'App',
  components: {
    LanguageSelector: () => import('./components/language/LanguageSelector.vue'),
  },
  data: function () {
    return {
      app: 1,
    };
  },
  mounted: function () {
    this.loadComponent();
  },
  methods: {
    loadComponent: function () {
      this.setDefaultLanguage();
    },
    setDefaultLanguage: function () {
      if (!this.$store.getters.getLanguage) {
        this.$store.dispatch('setLanguage', Locales.ptBr);
      }
    },
    toggleLanguage: function () {
      if (this.$store.getters.getLanguage === Locales.ptBr) {
        this.$store.dispatch('setLanguage', Locales.enUs);
        return;
      }
      this.$store.dispatch('setLanguage', Locales.ptBr);
    }
  }
};
</script>

<style scoped>
</style>
