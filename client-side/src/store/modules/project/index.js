import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

const projectModule = {
  state() {
    return {
      myProjects: new Array(),
      allProjects: new Array(),
    };
  },
  actions,
  mutations,
  getters,
};

export default projectModule;
