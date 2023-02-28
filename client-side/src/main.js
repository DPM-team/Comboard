import { createApp } from "vue";

import router from "./router.js";
import store from "./store/index.js";

// Import components
import App from "./App.vue";
import BaseSection from "./components/basic-components/BaseSection.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faPeopleGroup,
  faCalendarDays,
  faListCheck,
  faDiagramProject,
  faHandshakeSimple,
  faBoxOpen,
  faSun,
  faMoon,
  faBars,
  faSquareCaretDown,
  faBell,
  faInbox,
  faVideo,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faPeopleGroup, faCalendarDays, faListCheck, faDiagramProject, faHandshakeSimple, faBoxOpen, faSun, faMoon, faBars, faSquareCaretDown, faBell, faInbox, faVideo, faEllipsisVertical);

const app = createApp(App);

app.use(router);
app.use(store);

//Register global components
app.component("base-section", BaseSection);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
