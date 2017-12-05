import { Template } from 'wolkenkratzer';

let state = { template: Template() };

const mutations = {
  ADD_RESOURCE_TO_TEMPLATE(state, resource) {
    console.log('mutator ', resource);
    const newT = state.template.add(resource);
    console.log(newT.build());
    state.template = newT;
  },
  REMOVE_RESOURCE_FROM_TEMPLATE(state, resource) {
    state.template = state.template.remove(resource.Name);
  }
};

const actions = {
  addResourceToTemplate({ commit }, payload) {
    console.log('dispatched add. ', payload);
    commit('ADD_RESOURCE_TO_TEMPLATE', payload);
  },
  removeResourceFromTemplate({ commit }, payload) {
    console.log('dispatched remove.');
    commit('REMOVE_RESOURCE_FROM_TEMPLATE', payload);
  }
};

export default {
  state,
  mutations,
  actions
};
