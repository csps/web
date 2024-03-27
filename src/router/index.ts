import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle, getHistoryLength } from "~/utils/page";
import { useStore } from "~/store";
import { Config } from "~/config";
import { getStore } from "~/utils/storage";
import { validateLogin } from "~/utils/network";

/**
 * The routes of the application.
 */
const routes: RouteRecordRaw[] = [
  {
    path: `/${Config.ICN}`,
    name: "ICT Congress 2024",
    component: () => import("../pages/ictcongress/ICTCongress.vue"),
  },
  {
    path: `/${Config.ICN}/admin`,
    name: "Admin - ICT Congress 2024",
    component: () => import("../pages/ictcongress/ICTAdmin.vue"),
  },
  {
    path: `/${Config.ICN}/admin/login`,
    name: "Login - ICT Congress 2024",
    component: () => import("../pages/ictcongress/ICTLogin.vue"),
  },
  {
    path: `/${Config.ICN}/admin/scan`,
    name: "RFID Scanner - ICT Congress 2024",
    component: () => import("../pages/ictcongress/ICTScan.vue"),
  },
  {
    path: "/tatakforms",
    name: "Tatak Forms Landing",
    component: () => import("../pages/tatakforms/TatakFormLandingPage.vue"),
  },
  {
    path: "/tatakforms/home",
    name: "Tatak Forms Home",
    component: () => import("../pages/tatakforms/profile/HomePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tatakforms/event/:slug",
    name: "Tatak Forms Event",
    component: () => import("../pages/tatakforms/profile/EventPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tatakforms/register",
    name: "Tatak Forms Register",
    component: () => import("../pages/tatakforms/TatakFormEvent.vue"),
  },
  {
    path: "/tatakforms/register/:college",
    name: "Tatak Forms Registration",
    component: () => import("../pages/tatakforms/TatakFormEventRegistration.vue"),
  },
  {
    path: "/tatakforms/login",
    name: "Tatak Forms Login",
    component: () => import("../pages/tatakforms/TatakFormLoginPage.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/home/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login/LoginPage.vue"),
  },
  {
    path: "/merch",
    name: "Merch",
    component: () => import("../pages/merch/MerchPage.vue"),
  },
  {
    path: "/orders",
    name: "My Orders",
    component: () => import("../pages/orders/OrdersPage.vue"),
  },
  {
    path: "/orders/:uniqueId",
    name: "My Order",
    component: () => import("../pages/orders/OrdersInfo.vue"),
  },
  {
    path: "/merch/:slug",
    name: "Product",
    component: () => import("../pages/merch/MerchProductPage.vue"),
  },
  {
    path: "/merch/:slug/checkout",
    name: "Checkout",
    component: () => import("../pages/merch/MerchCheckoutPage.vue"),
  },
  {
    path: "/bulletin",
    name: "Bulletin",
    component: () => import("../pages/bulletin/BulletinPage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/about/AboutPage.vue"),
  },
  {
    path: "/forum",
    name: "Forum",
    component: () => import("../pages/forum/ForumPage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/profile/ProfilePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reset/:token",
    name: "Reset password",
    component: () => import("../pages/reset/ResetPage.vue"),
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin/:tab",
    name: "Admin",
    component: () => import("../pages/admin/AdminPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/orders/:reference",
    name: "Order",
    component: () => import("../pages/orders/OrdersInfo.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/login",
    name: "Admin Login",
    component: () => import("../pages/admin/AdminLogin.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "404 Not Found",
    component: () => import("../pages/NotFound.vue"),
  },
];

// Set initial history length
Config.initialHistoryLength = getHistoryLength();

/**
 * Creates a new router instance.
 */
const router = createRouter({
  history: createWebHistory("./"),
  routes,
});

let isValidated = false;

/**
 * Executes after each route change.
 */
router.beforeEach(async (to, _from, next) => {
  // Set loading to true
  const store = useStore();
  if (!store.isMaintenance) {
    store.isLoading = true;
  }

  // If not validated
  if (!isValidated) {
    isValidated = true;

    if (!(await validateLogin()) && to.meta.requiresAuth) {
      if(to.name === "Tatak Forms Home"){
        return next({ name: "Tatak Forms Login" });
      }
      return next();
    }
  }

  const isStudent = !!getStore("sat") && !!getStore("srt");
  const isAdmin = !!getStore("aat") && !!getStore("art");
  const isICTAdmin = !!getStore("iat") && !!getStore("irt");
  const isUnivStudent = !!getStore("usat") && !!getStore("usrt");
  if (isICTAdmin) {
    if (to.name === "Login - ICT Congress 2024") {
      return next({ name: "Admin - ICT Congress 2024" });
    }

    return next();
  }
  
  if (isAdmin) {
    if (to.name === "Admin Login" || (!isStudent && to.name === "Profile")) {
      return next({ name: "Admin", params: { tab: "dashboard" } });
    }

    return next();
  }

  if (isStudent) {
    if (to.name === "Admin" || to.name === "Login") {
      return next({ name: "Home" });
    }

    return next();
  }

  if (isUnivStudent) {
    if (to.name === "Tatak Forms Login") {
      return next({ name: "Tatak Forms Home" });
    }

    return next();
  }

  if (to.name === "Login" || to.name === "Admin Login") {
    return next();
  }
  
  // If checking out and no checkout details or product is not available
  if (to.name === "Checkout" && (!store.checkoutDetails || !store.checkoutDetails?.product.is_available)) {
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
router.afterEach(async (to, from) => {
  // Get store
  const store = useStore();
  // Set page title
  setPageTitle(
    to.name === "Profile"
      ? store.user.first_name + " " + store.user.last_name
      : (to.name as string)
  );
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
