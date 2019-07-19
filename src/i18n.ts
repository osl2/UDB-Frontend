import Vue from 'vue';
import VueI18n from 'vue-i18n';

import de from '@/languages/de.ts';
import en from '@/languages/en.ts';

Vue.config.productionTip = false;
// here
Vue.use(VueI18n);

const messages = {
  de: de,
  en: en,
};
// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: 'de', // set locale
  messages, // set locale messages
  fallbackLocale: 'en',
});
