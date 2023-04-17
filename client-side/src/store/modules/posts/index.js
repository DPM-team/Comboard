import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const postsModule = {
  state() {
    return {
      posts: [],
    };
  },
  mutations,
  actions,
  getters,
};

export default postsModule;
