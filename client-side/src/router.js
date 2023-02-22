import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import store from "./store";

import IndexPage from "./components/pages/IndexPage.vue";
import RegisterPage from "./components/pages/auth/RegisterPage.vue";
import LoginPage from "./components/pages/auth/LoginPage.vue";
import ForgotPasswordPage from "./components/pages/auth/ForgotPasswordPage.vue";
import DashboardPage from "./components/pages/DashboardPage.vue";
import OrganizationPage from "./components/pages/OrganizationPage.vue";
import File from "./components/org/FilesView.vue";
import PermissionDeniedPage from "./components/pages/PermissionDeniedPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: IndexPage,
    },
    {
      path: "/register",
      component: RegisterPage,
      meta: {
        requiresLogout: true,
      },
    },
    {
      path: "/login",
      component: LoginPage,
      // meta: {
      //   requiresLogout: true,
      // },
    },
    {
      path: "/retrieve-password/",
      component: ForgotPasswordPage,
      children: [
        {
          path: "step-1",
          component: ForgotPasswordPage,
        },
        {
          path: "step-2",
          component: ForgotPasswordPage,

          beforeEnter: (to, _, next) => {
            if (store.getters.getStep1) {
              next("/retrieve-password/step-2");
            }
          },
        },
        {
          path: "step-3",
          component: ForgotPasswordPage,
          beforeEnter: (to, _, next) => {
            if (store.getters.getStep2) {
              next("/retrieve-password/step-3");
            }
          },
        },
        {
          path: "step-4",
          component: ForgotPasswordPage,
          meta: {
            requiresStep: true,
          },
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/file",
      component: File,
    },
    {
      path: "/organization",
      component: OrganizationPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/permission-denied",
      component: PermissionDeniedPage,
    },
  ],
});

// Register a global nav guard
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/permission-denied");
  } else if (to.meta.requiresLogout && store.getters.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
