import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const retrieveAcountModule = {
  state() {
    return {
      step2: false,
      step3: false,
      step4: false,
    };
  },
  mutations,
  actions,
  getters,
};

export default retrieveAcountModule;
