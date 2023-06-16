import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle, setBodyPath } from "~/utils/page";

/**
 * The routes of the application.
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/LoginPage.vue")
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../pages/ShopPage.vue")
  },
  {
    path: "/bulletin",
    name: "Bulletin",
    component: () => import("../pages/BulletinPage.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/AboutPage.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "404 Not Found",
    component: () => import("../pages/NotFound.vue")
  },
];

/**
 * Creates a new router instance.
 */
const router = createRouter({
  history: createWebHistory("./"),
  routes
});

/**
 * Executes after each route change.
 */
router.beforeEach((to, _from, next) => {
  // Set path to body
  setBodyPath(to.path);
  // Continue to the page
  next();
});

/**
 * Executes after each route change.
 */
router.afterEach((to) => {
  // Set page title
  setPageTitle(to.name as string);
});

export default router;