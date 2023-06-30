import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    usersList: [],
    errorMessage: '',
    loading: false,
    hasError: false,
    success: false,
    mode: 'view',
    userData: {
      id: null,
      name: '',
      category: '',
      type: ''
    },
  },
  mutations: {
    resetUser(state) {
      state.userData = {
        id: null,
        name: '',
        category: '',
        type: ''
      };
    },
    modeChange(state, mode) {
      if (mode === 'view') {
        state.userData = {
          id: null,
          name: '',
          category: '',
          type: ''
        };
        state.mode = 'view';
      } else if (mode === 'create') {
        state.userData = {
          id: null,
          name: '',
          category: '',
          type: ''
        };
        state.mode = 'create';
      }
    },
    updateLoading(state, status) {
      state.loading = status;
    },
    onEditClick(state, item) {
      state.userData.id = item.id;
      state.userData.name = item.name;
      state.userData.category = item.category;
      state.userData.type = item.type;
      state.mode = 'edit';
    },
    setUsersList(state, users) {
      state.usersList = users;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    setHasError(state, hasError) {
      state.hasError = hasError;
    },
    setSuccess(state, success) {
      state.success = success;
    },
    handleInputChange(state, userData) {
      state.userData = { ...state.userData, [userData.type]: userData.value };
    }
  },
  actions: {
    async getList({ commit }) {
      try {
        commit('updateLoading', true);
        const resp = await axios.get('http://localhost:3000/api/v1/demo');
        if (resp.status === 200) {
          commit('setHasError', false);
          commit('setUsersList', resp.data);
        } else {
          commit('setErrorMessage', resp.statusText);
          commit('setHasError', true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        commit('updateLoading', false);
      }
    },
    async createItem({ commit, state }) {
      commit('updateLoading', true);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/demo', state.userData);
        if (response.status === 201) {
          commit('modeChange', 'view');
          commit('updateLoading', false);
          commit('setSuccess', true);
        } else {
          throw new Error(response);
        }
      } catch (error) {
        commit('updateLoading', false);
        commit('setErrorMessage', error?.response?.data?.message);
        commit('setHasError', true);
        console.error('There was an error!', error);
      }
    },
    async deleteItem({ commit, dispatch }, item) {
      if (item?.id) {
        commit('updateLoading', true);
        try {
          await axios.delete('http://localhost:3000/api/v1/demo/' + item.id);
          dispatch('getList');
        } catch (error) {
          console.error(error);
        } finally {
          commit('updateLoading', false);
        }
      }
    },
    async updateItem({ commit, state}) {
      commit('updateLoading', true);
      try {
        await axios.patch('http://localhost:3000/api/v1/demo/' + state.userData.id,  state.userData);
        commit('updateLoading', false);
        commit('setSuccess', true);
      } catch (error) {
        commit('updateLoading', false);
        commit('setErrorMessage', error?.response?.data?.message);
        commit('setHasError', true);
        console.error('There was an error!', error);
      }
    },
    onSubmit({ commit, state, dispatch }) {
      commit('setHasError', false);
      if (state.mode === 'create') {
          dispatch('createItem');
      } else if (state.mode === 'edit') {
          dispatch('updateItem');
      }
    },
    goToHome ({commit, dispatch}) {
      commit('resetUser');
      commit('modeChange', 'view')
      commit('setSuccess', false)
      dispatch('getList');
    }
  },
  getters: {
    userData: state => state.userData,
    userList: state => state.usersList,
    loading: state => state.loading,
    hasError: state => state.hasError,
    success: state => state.success,
  },
});

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');

