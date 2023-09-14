import { createWebHistory, createRouter } from "vue-router";
import HelloWorldVue from '@/components/HelloWorld.vue'
import UserComponentVue from '@/components/UserComponent.vue'
import ExampleComponent from '@/components/ExampleComponent.vue'

const routes = [
  { path: '/', component: HelloWorldVue },
  { path: '/users', component: UserComponentVue },
  { path: '/products', component: HelloWorldVue },
  { path: '/example', component: ExampleComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active"
});

export default router;
