import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle, getHistoryLength } from "~/utils/page";
import { isLoginValid } from "~/utils/network";
import { useStore } from "~/store";
import { Env } from "~/config";

/**
 * The routes of the application.
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/LoginPage.vue"),
    meta: { requiresAuth: true }
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
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/ProfilePage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/reset-password/:token",
    name: "Reset password",
    component: () => import("../pages/ResetPage.vue")
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
  // Set loading to true
  useStore().isLoading = true;

  // If going to route that requres auth
  if (to.meta.requiresAuth) {
    // Check if login is valid
    isLoginValid(valid => {
      // If is valid
      if (valid) {
        // Get store
        const store = useStore();
        // Set logged in
        store.isLoggedIn = true;
        // Go to route
        return next();
      }

      // If going to login
      if (to.name === "Login") return next();
      // Otherwise, return to login
      next({ name: "Login" });
    });

    return;
  }

  next();
});

/**
 * Executes after each route change.
 */
router.afterEach((to, from) => {
  // Get store 
  const store = useStore();
  // Set page title
  setPageTitle(to.name === "Profile" ? store.student.name || to.name : to.name as string);
  // Set loading to false
  store.isLoading = false;

  // If not on page load
  if (!from.name) return;
  // If not on the same page
  if (to.path === from.path) return;

  // Set back button visibility
  store.isShowBackButton = window.history.state.position - Env.initialHistoryLength > 0;
});

export default router;