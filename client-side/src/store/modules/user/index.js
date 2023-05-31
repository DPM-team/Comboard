import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

const userModule = {
  state() {
    return {
      profilePhoto: "",
      name: "",
      surname: "",
    };
  },
  actions,
  mutations,
  getters,
};

export default userModule;
