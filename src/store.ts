import Vue from 'vue';
import Vuex from 'vuex';
import SQLExecutor from "@/controller/SQLExecutor";
import {DefaultApi} from "@/api/DefaultApi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: new DefaultApi(),
    sqlExecutor: new SQLExecutor(),
  },
  mutations: {},
  actions: {},
  getters: {
    api: (state) => {
      return state.api;
    },
    sqlExecutor: (state) => {
      return state.sqlExecutor;
    },
  },
});
