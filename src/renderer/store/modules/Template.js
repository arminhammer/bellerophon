import { Template } from 'wolkenkratzer';

const state = Template();

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.template--;
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.template++;
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER');
  }
};

export default {
  state,
  mutations,
  actions
};
