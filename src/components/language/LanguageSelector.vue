<template>
  <div ref="languageSelector" style="position: fixed; bottom: 25px; left: 25px;" class="z-40">
    <div class="flex flex-col gap-1">
      <Transition name="fade">
        <div v-if="languageSelector" class="flex flex-col flex-nowrap languages">
          <div
            v-for="language in languages"
            :key="language.value"
            class="flex flex-row items-center px-3 py-1 roboto gap-2 cursor-pointer language-option"
            :class="language.value === selectedLanguage.value ? 'selected' : 'language'"
            @click="setLanguage(language.value)"
          >
            <div>
                <country-flag :country="language.flag" shadow />
            </div>
            <span>{{ language.label }}</span>
          </div>
        </div>
      </Transition>
      <div
        class="flex flex-row items-center px-3 py-1 select-language roboto gap-2"
        :class="languageSelector ? 'menu-open' : 'menu-closed'"
        @click="openLanguageSelector"
        @blur="languageSelector = false"
      >
        <div>
            <country-flag :country="selectedLanguage.flag" shadow />
        </div>
        <span>{{ selectedLanguage.label }}</span>
        <mdicon :name="languageSelector ? 'chevron-down' : 'chevron-up'" />
      </div>
    </div>
  </div>
</template>

<script>
import { LocalesOptions } from '../../i18n/locales';

export default {
  name: 'LanguageSelector',
  data() {
    return {
      languageSelector: false,
      languages: LocalesOptions,
    };
  },
  computed: {
    selectedLanguage() {
      return this.languages.find((locale) => locale.value === this.$store.getters.getLanguage);
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickInside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickInside);
  },
  methods: {
    handleClickInside(event) {
      if (!this.$refs.languageSelector.contains(event.target)) {
        this.languageSelector = false;
      }
    },
    openLanguageSelector() {
      this.languageSelector = !this.languageSelector;
    },
    setLanguage(language) {
      this.$store.dispatch('setLanguage', language);
      this.languageSelector = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.select-language {
  cursor: pointer;
  color: var(--color-text-neutral-darkest);
  font-weight: medium;
  background-color: white;
}

.menu-open {
  border-top: none;
  border-left: 1px solid var(--color-border-primary);
  border-right: 1px solid var(--color-border-primary);
  border-bottom: 1px solid var(--color-border-primary);
}

.menu-closed {
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
}

.languages {
  border: 1px solid var(--color-border-primary);
  color: var(--color-text-neutral-darkest);
  font-weight: medium;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #FFFFFF;
}

.language-option {
  display: flex;
  align-items: center;
}

.selected {
  background-color: var(--color-background-tertiary-transparent);
  border-radius: 8px;
}

.language:hover {
  background-color: var(--color-background-secondary-transparent);
}
</style>