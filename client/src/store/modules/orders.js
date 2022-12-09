import axios from "axios";

export default {
  state: {
    orders: [],
  },
  getters: {
    orders(state) {
      return state.orders.reverse();
    },
  },
  mutations: {
    changeOrders(state, orders) {
      state.orders = orders;
    },
  },
  actions: {
    async getOrders({ commit }) {
      try {
        commit("toggleIsLoading");
        const response = await axios.get("http://localhost:4000/orders");
        const orders = await response.data;
        commit("toggleIsLoading");

        commit("changeOrders", orders);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
