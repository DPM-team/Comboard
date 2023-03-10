import { createApp } from "vue";

import router from "./router.js";
import store from "./store/index.js";

// Import components
import App from "./App.vue";
import BaseSection from "./components/basic-components/BaseSection.vue";
import BaseCard from "./components/basic-components/BaseCard.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
  faUserPlus,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart, faComment, faFilePdf, faFileWord, faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
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
  faHeart,
  faComment,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faUserPlus,
  faAnglesRight,
  faGoogle
);

const app = createApp(App);

app.use(router);
app.use(store);

//Register global components
app.component("base-section", BaseSection);
app.component("base-card", BaseCard);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
