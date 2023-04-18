import { createStore } from "vuex";

// Import all modules
import authModule from "./modules/auth/index.js";
import retrieveAccountModule from "./modules/retrieve-account/index.js";
import organizationModule from "./modules/organization/index.js";
import userModule from "./modules/user/index.js";
import postModule from "./modules/posts/index.js";
import teamModule from "./modules/team/index.js";
import projectModule from "./modules/project/index.js";
import fileModule from "./modules/files/index.js";

const store = createStore({
  modules: {
    authModule,
    retrieveAccountModule,
    organizationModule,
    userModule,
    postModule,
    teamModule,
    projectModule,
    fileModule,
  },
});

export default store;
