import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Sandbox from '@/views/Sandbox.vue';
import CourseViewStudent from "@/views/CourseViewStudent.vue";
import StartpageTeacher from "@/views/StartpageTeacher.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/sandbox',
      name: 'sandbox',
      component: Sandbox,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/startpageTeacher',
      name: 'startpageTeacher',
      component: StartpageTeacher,
    },
    {
      path: '/courseViewStudent',
      name: 'courseViewStudent',
      component: CourseViewStudent,
    },
  ],
});
