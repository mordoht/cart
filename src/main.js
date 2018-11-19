import store from './store';
import CatsAndDogs from './components/CatsAndDogs';
import Dogs from './components/Dogs';
import Cats from './components/Cats';
import SignIn from './components/SignIn';
import CartCheckout from './components/CartCheckout';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'CatsAndDogs',
    component: CatsAndDogs,
  },
  {
    path: '/chiens',
    name: 'Dogs',
    component: Dogs,
  },
  {
    path: '/chats',
    name: 'Cats',
    component: Cats,
  },

  {
    path: '/checkout',
    name: 'Checkout',
    component: CartCheckout,
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn,
  },
];

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

