import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import IndexPage from "./components/pages/IndexPage.vue";
import RegisterPage from "./components/pages/auth/RegisterPage.vue";
import LoginPage from "./components/pages/auth/LoginPage.vue";
import DashboardPage from "./components/pages/DashboardPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: new Array(
    {
      path: "/",
      component: IndexPage,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/dashboard",
      component: DashboardPage,
    }
  ),
});

export default router;
