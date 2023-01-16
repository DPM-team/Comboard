import { createStore } from "vuex";

// Import all modules
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    authModule,
  },
});

export default store;
