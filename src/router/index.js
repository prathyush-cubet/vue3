import { createWebHistory, createRouter } from "vue-router";
import ProductComponentVue from '@/components/ProductComponent.vue'
import UserComponentVue from '@/components/UserComponent.vue'
import ExampleComponent from '@/components/ExampleComponent.vue'
import DirectiveComponent from '@/components/DirectiveComponent.vue'
import TestComponent from '@/components/TestComponent.vue'

const routes = [
  { path: '/', component: DirectiveComponent },
  { path: '/users', component: UserComponentVue },
  { path: '/products', component: ProductComponentVue },
  { path: '/example', component: ExampleComponent },
  { path: '/test', component: TestComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active"
});

export default router;
