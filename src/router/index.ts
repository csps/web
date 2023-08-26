import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle, getHistoryLength, getLocal } from "~/utils/page";
import { isAdminLoginValid, isLoginValid } from "~/utils/network";
import { useStore } from "~/store";
import { Env } from "~/config";

/**
 * The routes of the application.
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/home/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login/LoginPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/merch",
    name: "Merch",
    component: () => import("../pages/merch/MerchPage.vue")
  },
  {
    path: "/orders",
    name: "My Orders",
    component: () => import("../pages/orders/OrdersPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/merch/:id",
    name: "Product",
    component: () => import("../pages/merch/MerchProductPage.vue")
  },
  {
    path: "/merch/:id/checkout",
    name: "Checkout",
    component: () => import("../pages/merch/MerchCheckoutPage.vue")
  },
  {
    path: "/bulletin",
    name: "Bulletin",
    component: () => import("../pages/bulletin/BulletinPage.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/about/AboutPage.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/profile/ProfilePage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/reset-password/:token",
    name: "Reset password",
    component: () => import("../pages/reset/ResetPage.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/admin/AdminPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/login",
    name: "Admin Login",
    component: () => import("../pages/admin/AdminLogin.vue"),
    meta: { requiresAuth: true }
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
    // CHeck for admin token
    const token = getLocal("csps_token");

    // If goiing to admin page
    if (to.name === "Admin" && !token) {
      // Go to login
      return next({ name: "Admin Login" });
    }

    // If going to admin login
    if (to.name === "Admin Login" && !token) {
      // Go to login
      return next();
    }

    // If going to student login or profile and has admin token
    if (["Login", "Profile"].includes(to.name as string) && !!token) {
      // Go to admin
      return next({ name: "Admin" });
    }

    // If has token
    if (!!token) {
      isAdminLoginValid(isAdminLoginValid => {
        // If is valid
        if (isAdminLoginValid) {
          // Get store
          const store = useStore();
          // Set logged in
          store.isAdminLoggedIn = true;
          // Go to route
          return next();
        }

        // If going to login
        if (to.name === "Admin Login") return next();
        // Otherwise, return to login
        next({ name: "Admin Login" });
      });

      return;
    }

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

  // If checking out and no checkout details
  if (to.name === "Checkout" && !useStore().checkoutDetails) {
    // if has previous page
    if (_from.name) {
      // Go to previous page
      return next({ name: _from.name as string });
    }

    // Otherwise, go to merch
    return next({ name: "Merch" });
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
  setPageTitle(to.name === "Profile" ? (store.student.first_name + " " + store.student.last_name) : to.name as string);
  // Set loading to false
  store.isLoading = false;

  // If not on page load
  if (!from.name) return;
  // If not on the same page
  if (to.path === from.path) return;

  // Set back button visibility
  store.isShowBackButton = window.history.state.position - (Env.initialHistoryLength ? (Env.initialHistoryLength as number) : 0) > 0;
});

export default router;