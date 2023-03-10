import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const organizationModule = {
  state() {
    return {
      selectedOrganizationID: null,
    };
  },
  mutations,
  actions,
  getters,
};

export default organizationModule;
