import { createRouter, createWebHistory } from 'vue-router'
import QuizHomeView from '@/views/QuizHomeView.vue'
import QuizQuestionView from '@/views/QuizQuestionView.vue'
import ResultsView from '@/views/ResultsView.vue'
import ScoreView from '@/views/ScoreView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: QuizHomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizQuestionView,
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: ScoreView,
    },
  ]
});

export default router
