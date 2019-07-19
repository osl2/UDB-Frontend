import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {i18n} from './i18n';
import './registerServiceWorker';

new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
