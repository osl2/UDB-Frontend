import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
// here
Vue.use(VueI18n);

const messages = {
  de: {
    standbox: {
      titleStartpage: 'Freier Modus',
    },
  },
  en: {
    standbox: {
      titleStartpage: 'Free mode',
    },
  },
};
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'de', // set locale
  messages, // set locale messages
  fallbackLocale: 'en',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
