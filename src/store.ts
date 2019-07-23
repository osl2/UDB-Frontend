import Vue from 'vue';
import Vuex from 'vuex';
import {DefaultApi} from "@/api/DefaultApi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      api: new DefaultApi(),
  },
  mutations: {

  },
  actions: {

  },
  getters: {
      api: (state) => {
          return state.api;
      },
  },
});
