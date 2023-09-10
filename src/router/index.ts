import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle, getHistoryLength } from "~/utils/page";
import { isAdminLoginValid, isLoginValid } from "~/utils/network";
import { getStore } from "~/utils/storage";
import { useStore } from "~/store";
import { Config } from "~/config";

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
    path: "/merch/receipt/:receipt",
    name: "Receipt",
    component: () => import("../pages/merch/MerchReceiptPage.vue")
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
    redirect: "/admin/dashboard"
  },
  {
    path: "/admin/:tab",
    name: "Admin",
    component: () => import("../pages/admin/AdminPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/orders/:receipt",
    name: "Order",
    component: () => import("../pages/admin/tabs/TabOrdersInfo.vue"),
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
Config.initialHistoryLength = getHistoryLength();

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
    // Check for admin token
    const token = getStore("csps_token");

    // If goiing to admin page
    if (to.name === "Admin" && !token) {
      return next({ name: "Admin Login" });
    }

    // If going to admin login
    if (to.name === "Admin Login" && !token) {
      return next();
    }

    // If going to profile and has logged in admin
    if (to.name === 'Profile' && token) {
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

  // If checking out and no checkout details or product is not available
  if (to.name === "Checkout" && (!useStore().checkoutDetails || !useStore().checkoutDetails?.product.is_available)) {
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
  store.isShowBackButton = window.history.state.position - (Config.initialHistoryLength ? (Config.initialHistoryLength as number) : 0) > 0;
});

export default router;