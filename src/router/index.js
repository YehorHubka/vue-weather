import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("../views/FavoritesView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
