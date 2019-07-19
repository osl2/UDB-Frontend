import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.config.productionTip = false;
// here
Vue.use(VueI18n);

const messages = {
  de: {
    home: {
      language: 'Sprache:',
      langGerman: 'Deutsch',
      langEnglish: 'Englisch',
      logo: 'u<sup>DB</sup>',
      slogan: 'Du an die Macht der Datenbanken',
    },
    sandbox: {
      titleStartpage: 'Freier Modus',
    },
  },
  en: {
    home: {
      language: 'Language:',
      langGerman: 'German',
      langEnglish: 'English',
      logo: 'u<sup>DB</sup>',
      slogan: 'You to the power of database',
    },
    sandbox: {
      titleStartpage: 'Free mode',
    },
  },
};
// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: 'de', // set locale
  messages, // set locale messages
  fallbackLocale: 'en',
});
