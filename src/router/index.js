import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/pages/HomePage.vue';
import NotFound from '../components/pages/NotFound.vue';
import DriverPage from '../components/pages/DriverPage.vue';
import ConstructorPage from '../components/pages/ConstructorPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { 
        path: '/',
        redirect: "/standings"
      },
      {
        path: '/standings',
        component: HomePage
      },
      {
        path: '/standings/:year',
        component: HomePage,
        props: true
      },
      {
        path: '/standings/:year/drivers/:driver',
        component: DriverPage
      },
      {
        path: '/standings/:year/constructors/:constructor',
        component: ConstructorPage,
        props: true
      },
      {path: '/:notFound(.*)', component: NotFound }
    ]
  })
  
  export default router;