import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const retrieveAcountModule = {
  state() {
    return {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      activeStep: 1,
    };
  },
  mutations,
  actions,
  getters,
};

export default retrieveAcountModule;
