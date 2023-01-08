import { createApp } from "vue";

import router from "./router.js";
import store from "./store/index.js";

// Import components
import App from "./App.vue";
import BaseSection from "./components/basic-components/BaseSection.vue";
import BaseCard from "./components/basic-components/BaseCard.vue";

const app = createApp(App);

app.use(router);
app.use(store);

//Register global components
app.component("base-section", BaseSection);
app.component("base-card", BaseCard);

app.mount("#app");
