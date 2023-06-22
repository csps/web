import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle, setBodyPath, getHistoryLength } from "~/utils/page";
import { useStore } from "~/store";
import { Env } from "~/config";

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

// Set initial history length
Env.initialHistoryLength = getHistoryLength();

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
router.afterEach((to, from) => {
  // Set page title
  setPageTitle(to.name as string);

  // If not on page load
  if (!from.name) return;
  // If not on the same page
  if (to.path === from.path) return;

  // Set back button visibility
  useStore().isShowBackButton = window.history.state.position - Env.initialHistoryLength > 0;
});

export default router;