import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "@/pages/WelcomePage.vue";
import QuizPage from "@/pages/QuizPage.vue";
import QuizNextPage from "@/pages/QuizNextPage.vue";
import ResponsePage from "@/pages/Response.vue";
import ChooseRolePage from "@/pages/ChooseRolePage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import DashPage from "@/pages/DashPage.vue";
import { pb } from "@/lib/pocketbase"; // ⬅️ import your PB instance

const routes = [
  { path: "/", component: WelcomePage },
  { path: "/quiz", component: QuizPage },
  { path: "/quiz/next", component: QuizNextPage },
  { path: "/response", component: ResponsePage },
  { path: "/choose-role", component: ChooseRolePage }, // 👈 new route
  { path: "/admin", component: AdminPage },
  {
    path: "/dash",
    component: DashPage,
    meta: { requiresAuth: true }, // 👈 only logged-in users can access
  },
];

const router = createRouter({
  history: createWebHistory("/wordpress-react/"),
  routes,
});

// 🔐 Global auth guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = pb.authStore.isValid;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/admin"); // redirect to login
  } else {
    next(); // proceed
  }
});

export default router;
