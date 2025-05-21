import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/pages/Landing.vue";

const routes = [{ path: "/", component: Landing }];

const router = createRouter({
    history: createWebHistory('/wordpress-react/'), // MUST match `base`

  routes,
});

export default router;
