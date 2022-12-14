import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },

  {
    path: '/create/:lang',
    name: 'CreateView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },
  {
    path: '/chooseplayer/:lang/:id/:playid',
    name: 'ChoosePlayerView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChoosePlayerView.vue')

  },
  {
    path: '/lobby/:lang/:id',
    name: 'PlayerLobby',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayerLobby.vue')
  },
  {
    path: '/questionresult/:lang/:id',
    name: 'ShowQuestionResult/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowQuestionResult.vue')
  },

  {

    path: '/creatqpart/:lang/:id/:playid',

    name: 'CreateQPartView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateQPartView.vue')
  },
  {
    path: '/creatqhost/:lang/:id',
    name: 'CreateQhostView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/createQHostView.vue')
  },
  {


    path: '/answerq/:lang/:id/:playid',
    name: 'AnswerQView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AnswerQView.vue')
  },
  {


    path: '/ScoreBoard2/',
    name: 'ScoreBoardView2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ScoreBoardView2.vue')
  },

  {

  path: '/CheckCorrectAnswer/',
  name: 'CheckCorrectAnswer',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/CheckCorrectAnswer.vue')
},

{
  path: '/guessQuestion/:lang/:id/:playid',
  name: 'GuessQuestionView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GuessQuestionView.vue')
},


  {
    path: '/QuestionLobby/:lang/:id',
    name: 'QuestionLobby',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/QuestionLobby.vue')
  },


{
  path: '/Waiting/:lang/:id/:playid',
  name: 'AnsweQuestionView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/WaitingForPlayersView.vue')
},
{
  path: '/AnswerQHost/:lang/:id',
  name: 'AnswerHostView',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/AnswerQHView.vue')
},




]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

