import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Sandbox from '@/views/Sandbox.vue';
import CourseView from "@/views/CourseView.vue";
import StartpageTeacher from "@/views/StartpageTeacher.vue";
import TeacherWorksheet from '@/views/TeacherWorksheet.vue';
import StudentWorksheet from '@/views/StudentWorksheet.vue';

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
      path: '/courseView/:courseId',
      name: 'courseView',
      component: CourseView,
    },
    {
      path: '/studentWorksheet/:worksheetId',
      name: 'studentWorksheet',
      component: StudentWorksheet,
    },
    {
      path: '/teacherWorksheet/:worksheetId',
      name: 'teacherWorksheet',
      component: TeacherWorksheet,
    },
  ],
});
