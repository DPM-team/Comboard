import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import IndexPage from "./components/pages/IndexPage.vue";
import RegisterPage from "./components/pages/auth/RegisterPage.vue";
import LoginPage from "./components/pages/auth/LoginPage.vue";
import ForgotPasswordPage from "./components/pages/auth/ForgotPasswordPage.vue";
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
      path: "/retrieve-password",
      component: ForgotPasswordPage,
      children: [{ path: "step-1", component: ForgotPasswordPage }],
    },
    {
      path: "/dashboard",
      component: DashboardPage,
    }
  ),
});

export default router;
