import { createRouter, createWebHistory } from 'vue-router';

import WelcomePage from '@/pages/WelcomePage.vue';
import QuizPage from '@/pages/QuizPage.vue';
import QuizNextPage from '@/pages/QuizNextPage.vue';
import ResponsePage from '@/pages/Response.vue';
import ChooseRolePage from "@/pages/ChooseRolePage.vue";

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/quiz', component: QuizPage },
  { path: '/quiz/next', component: QuizNextPage }, 
  { path: '/response', component: ResponsePage },
    { path: '/choose-role', component: ChooseRolePage }, // 👈 new route

];


const router = createRouter({
  history: createWebHistory("/wordpress-react/"),
  routes,
});

export default router;
