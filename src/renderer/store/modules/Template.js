import { Output, Ref, Template } from 'wolkenkratzer';

let state = { template: Template(), internal: {} };

const mutations = {
  ADD_RESOURCE(state, resource) {
    state.template = state.template.add(resource);
  },
  REMOVE_RESOURCE(state, resource) {
    state.template = state.template.remove(resource.Name);
  },
  ADD_OUTPUT_RESOURCE(state, resourceName) {
    state.template = state.template.add(
      Output(`${resourceName}Output`, { Value: Ref(resourceName) })
    );
  },
  REMOVE_OUTPUT_RESOURCE(state, resourceName) {
    state.template = state.template.remove(`${resourceName}Output`);
  }
};

const actions = {
  addResourceToTemplate({ commit }, payload) {
    console.log('dispatched add. ', payload);
    commit('ADD_RESOURCE', payload);
  },
  removeResourceFromTemplate({ commit }, payload) {
    console.log('dispatched remove.');
    commit('REMOVE_RESOURCE', payload);
  },
  addOutputResourceToTemplate({ commit }, payload) {
    console.log('dispatched add. ', payload);
    commit('ADD_OUTPUT_RESOURCE', payload);
  },
  removeOutputResourceFromTemplate({ commit }, payload) {
    console.log('dispatched remove.');
    commit('REMOVE_OUTPUT_RESOURCE', payload);
  }
};

export default {
  state,
  mutations,
  actions
};
