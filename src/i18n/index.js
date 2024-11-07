import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { messages, Locales } from './locales/index.js';
import store from '../store';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: store.getters.getLanguage || Locales.ptBr,
  messages: messages,
});

export default i18n;