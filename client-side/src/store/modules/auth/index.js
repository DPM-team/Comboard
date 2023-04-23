import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const authModule = {
  state() {
    return {
      loggedUserID: null,
      loggedUserToken: null,
      userImage: null,
    };
  },
  mutations,
  actions,
  getters,
};

export default authModule;
