import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

const teamModule = {
  state() {
    return {
      myTeams: new Array(),
      allTeams: new Array(),
    };
  },
  actions,
  mutations,
  getters,
};

export default teamModule;
