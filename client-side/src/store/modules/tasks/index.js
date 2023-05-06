import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

const tasksModule = {
  state() {
    return {
      selectedBoardID: "",
    };
  },
  actions,
  mutations,
  getters,
};

export default tasksModule;
