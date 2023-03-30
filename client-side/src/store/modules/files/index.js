import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const fileModule = {
  state() {
    return {
      files: [],
    };
  },
  mutations,
  actions,
  getters,
};

export default fileModule;
