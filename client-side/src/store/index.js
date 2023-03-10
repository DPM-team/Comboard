import { createStore } from "vuex";

// Import all modules
import authModule from "./modules/auth/index.js";
import retrieveAccountModule from "./modules/retrieve-account/index.js";
import organizationModule from "./modules/organization/index.js";

const store = createStore({
  modules: {
    authModule,
    retrieveAccountModule,
    organizationModule,
  },
});

export default store;
