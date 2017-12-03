import { spec, Template } from 'wolkenkratzer';
import { approvedServices } from '../../aws_utils';

const state = {
  activeService: 'S3',
  activeResource: 'Bucket',
  resources: approvedServices.reduce((acc, curr) => {
    acc[curr] = Object.keys(spec[curr].Resources).reduce((acc0, curr0) => {
      acc0[curr0] = [
        { title: `${curr0}0` },
        { title: `${curr0}1` },
        { title: `${curr0}2` }
      ];
      return acc0;
    }, {});
    return acc;
  }, {})
};

const mutations = {
  SET_ACTIVE_RESOURCE(state, payload) {
    console.log('mutating');
    state.activeResource = payload;
  },
  SET_ACTIVE_SERVICE(state, payload) {
    console.log('mutating');
    state.activeService = payload;
  },
  DECREMENT_MAIN_COUNTER(state) {
    state.template--;
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.template++;
  }
};

const actions = {
  setActiveService({ commit }, payload) {
    console.log('dispatched.');
    commit('SET_ACTIVE_SERVICE', payload);
  },
  setActiveResource({ commit }, payload) {
    console.log('dispatched, ', payload);
    commit('SET_ACTIVE_RESOURCE', payload);
  },
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
