import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Favorites from '@/components/Favorites';
import Breed from '@/components/Breed';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/favourites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/:breed',
      name: 'Breed',
      component: Breed,
      props: true
    }
  ]
});
