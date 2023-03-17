import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import store from "./store";

import IndexPage from "./components/pages/IndexPage.vue";
import RegisterPage from "./components/pages/auth/RegisterPage.vue";
import LoginPage from "./components/pages/auth/LoginPage.vue";
import ForgotPasswordPage from "./components/pages/auth/ForgotPasswordPage.vue";
import DashboardPage from "./components/pages/DashboardPage.vue";
import OrganizationPage from "./components/pages/OrganizationPage.vue";
import NetworkTab from "./components/organization/network/NetworkTab.vue";
import CalendarTab from "./components/organization/calendar/CalendarTab.vue";
import TasksTab from "./components/organization/tasks/TasksTab.vue";
import ProjectsTab from "./components/organization/projects/ProjectsTab.vue";
import AllProjectsTab from "./components/organization/projects/AllProjectsTab.vue";
import MyProjectsTab from "./components/organization/projects/MyProjectsTab.vue";
import TeamsTab from "./components/organization/teams/TeamsTab.vue";
import StorageTab from "./components/organization/storage/StorageTab.vue";
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
    },
    {
      path: "/login",
      component: LoginPage,
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
              next();
            } else {
              next("/retrieve-password/step-1");
            }
          },
        },

        {
          path: "step-3",
          component: ForgotPasswordPage,
          beforeEnter: (to, _, next) => {
            if (store.getters.getStep2) {
              next();
            } else {
              next("/retrieve-password/step-2");
            }
          },
        },
        {
          path: "step-4",
          component: ForgotPasswordPage,
          meta: {
            requiresStep: true,
          },
          beforeEnter: (to, _, next) => {
            if (store.getters.getStep3) {
              next();
            } else {
              next("/retrieve-password/step-3");
            }
          },
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardPage,
    },
    {
      path: "/organization",
      component: OrganizationPage,
      redirect: "/organization/network",
      children: [
        {
          path: "network",
          component: NetworkTab,
        },
        {
          path: "calendar",
          component: CalendarTab,
        },
        {
          path: "tasks",
          component: TasksTab,
        },
        {
          path: "projects",
          component: ProjectsTab,
          redirect: "/organization/projects/participate",
          children: [
            {
              path: "participate",
              component: MyProjectsTab,
            },
            {
              path: "all",
              component: AllProjectsTab,
            },
          ],
        },
        {
          path: "teams",
          component: TeamsTab,
        },
        {
          path: "storage",
          component: StorageTab,
        },
      ],
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
