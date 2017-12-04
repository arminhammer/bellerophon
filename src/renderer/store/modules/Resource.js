import { spec, Template } from 'wolkenkratzer';
import { approvedServices, listResources } from '../../aws_utils';

const state = {
  activeService: 'S3',
  activeResource: 'Bucket',
  resources: approvedServices.reduce((acc, curr) => {
    acc[curr] = Object.keys(spec[curr].Resources).reduce((acc0, curr0) => {
      acc0[curr0] = {
        to: `/service/${curr}/${curr0}`,
        items: [
          { title: `${curr0}0` },
          { title: `${curr0}1` },
          { title: `${curr0}2` }
        ]
      };
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
  SET_RESOURCES_FROM_AWS(state, { Service, Resource, Result }) {
    console.log('mutating AWS', Result);
    state.resources[Service][Resource] = Result;
    //state.activeService = payload;
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
  },
  async updateAWSResource({ commit }, { Service, Resource }) {
    console.log('payload: ', Service, ' ', Resource);
    let Result;
    if (listResources[Service] && listResources[Service][Resource]) {
      Result = await listResources[Service][Resource]();
    } else {
      Result = await new Promise(res =>
        res({ to: `/service/${Service}/${Resource}`, items: [] })
      );
    }
    console.log('update result:');
    console.log(Result);
    commit('SET_RESOURCES_FROM_AWS', { Service, Resource, Result });
  }
};

export default {
  state,
  mutations,
  actions
};
