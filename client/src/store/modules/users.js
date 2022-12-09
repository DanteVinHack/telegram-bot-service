import axios from "axios";

export default {
  state: {
    users: [],
  },
  getters: {
    users(state) {
      return state.users.reverse();
    },
    usersLength(state) {
      return state.users.length;
    },
  },
  mutations: {
    changeUsers(state, users) {
      state.users = users;
    },
    removeUser(state, _id) {
      state.users = state.users.filter(user => user._id !== _id);
    },
    removeAllUsers(state) {
      state.users = [];
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        commit("toggleIsLoading");
        const response = await axios.get("http://localhost:4000/users");
        const users = await response.data;
        commit("toggleIsLoading");

        commit("changeUsers", users);
      } catch (error) {
        console.log(error.message);
      }
    },
    async removeUser({ commit }, _id) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/users/${_id}`
        );

        if (response.status === 200) {
          commit("removeUser", _id);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async removeAllUsers({ commit }) {
      try {
        const response = await axios.delete(`http://localhost:4000/users/`);

        if (response.status === 200) {
          commit("removeAllUsers");
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
