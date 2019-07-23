import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import de from '@/languages/de.ts';
import en from '@/languages/en.ts';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCloudUploadAlt, faUpload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';


// Boostrap integration with Vue
Vue.use(BootstrapVue);
library.add(faUpload, faCloudUploadAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
// here
Vue.use(VueI18n);

const messages = {
  de,
  en,
};

// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: 'de', // set locale
  messages, // set locale messages
  fallbackLocale: 'de',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
