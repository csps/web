/**
 * Might find a better way to use icons effeciently in the future
 * @author mavyfaby (Maverick Fabroa)
 */

import ArrowBack from "@material-symbols/svg-700/rounded/arrow_back-fill.svg?raw";
import ArrowBackOutlined from "@material-symbols/svg-700/rounded/arrow_back.svg?raw";

import ArrowForward from "@material-symbols/svg-700/rounded/arrow_forward-fill.svg?raw";
import ArrowForwardOutlined from "@material-symbols/svg-700/rounded/arrow_forward.svg?raw";

import Menu from "@material-symbols/svg-700/rounded/menu-fill.svg?raw";
import MenuOutlined from "@material-symbols/svg-700/rounded/menu.svg?raw";

import PhotoCamera from "@material-symbols/svg-700/rounded/photo_camera-fill.svg?raw";
import PhotoCameraOutlined from "@material-symbols/svg-700/rounded/photo_camera.svg?raw";

import Favorite from "@material-symbols/svg-700/rounded/favorite-fill.svg?raw";
import FavoriteOutlined from "@material-symbols/svg-700/rounded/favorite.svg?raw";

import Verified from "@material-symbols/svg-700/outlined/verified-fill.svg?raw";
import VerifiedOutlined from "@material-symbols/svg-700/outlined/verified.svg?raw";

import Lock from "@material-symbols/svg-700/rounded/lock-fill.svg?raw";
import LockOutlined from "@material-symbols/svg-700/rounded/lock.svg?raw";

import Visibility from "@material-symbols/svg-700/rounded/visibility-fill.svg?raw";
import VisibilityOutlined from "@material-symbols/svg-700/rounded/visibility.svg?raw";

import VisibilityOff from "@material-symbols/svg-700/rounded/visibility_off-fill.svg?raw";
import VisibilityOffOutlined from "@material-symbols/svg-700/rounded/visibility_off.svg?raw";

import Home from "@material-symbols/svg-700/rounded/home-fill.svg?raw";
import HomeOutlined from "@material-symbols/svg-700/rounded/home.svg?raw";

import Diversity from "@material-symbols/svg-700/rounded/diversity_1-fill.svg?raw";
import DiversityOutlined from "@material-symbols/svg-700/rounded/diversity_1.svg?raw";

import Dashboard from "@material-symbols/svg-700/rounded/dashboard-fill.svg?raw";
import DashboardOutlined from "@material-symbols/svg-700/rounded/dashboard.svg?raw";

import Store from "@material-symbols/svg-700/rounded/store-fill.svg?raw";
import StoreOutlined from "@material-symbols/svg-700/rounded/store.svg?raw";

import Login from "@material-symbols/svg-700/rounded/login-fill.svg?raw";
import LoginOutlined from "@material-symbols/svg-700/rounded/login.svg?raw";

import Logout from "@material-symbols/svg-700/rounded/logout-fill.svg?raw";
import LogoutOutlined from "@material-symbols/svg-700/rounded/logout.svg?raw";

import AccountCircle from "@material-symbols/svg-700/rounded/account_circle-fill.svg?raw";
import AccountCircleOutlined from "@material-symbols/svg-700/rounded/account_circle.svg?raw";

import Link from "@material-symbols/svg-700/rounded/link-fill.svg?raw";
import LinkOutlined from "@material-symbols/svg-700/rounded/link.svg?raw";

import ShoppingCart from "@material-symbols/svg-700/rounded/shopping_cart-fill.svg?raw";
import ShoppingCartOutlined from "@material-symbols/svg-700/rounded/shopping_cart.svg?raw";

import Badge from "@material-symbols/svg-700/rounded/badge-fill.svg?raw";
import BadgeOutlined from "@material-symbols/svg-700/rounded/badge.svg?raw";

import School from "@material-symbols/svg-700/rounded/school-fill.svg?raw";
import SchoolOutlined from "@material-symbols/svg-700/rounded/school.svg?raw";

import Mail from "@material-symbols/svg-700/rounded/mail-fill.svg?raw";
import MailOutlined from "@material-symbols/svg-700/rounded/mail.svg?raw";

import Add from "@material-symbols/svg-700/rounded/add-fill.svg?raw";
import AddOutlined from "@material-symbols/svg-700/rounded/add.svg?raw";

import Remove from "@material-symbols/svg-700/rounded/remove-fill.svg?raw";
import RemoveOutlined from "@material-symbols/svg-700/rounded/remove.svg?raw";

import QRCode from "@material-symbols/svg-700/rounded/qr_code-fill.svg?raw";
import QRCodeOutlined from "@material-symbols/svg-700/rounded/qr_code.svg?raw";

import Footprint from "@material-symbols/svg-700/rounded/footprint-fill.svg?raw";
import FootprintOutlined from "@material-symbols/svg-700/rounded/footprint.svg?raw";

import ShoppingCartCheckout from "@material-symbols/svg-700/rounded/shopping_cart_checkout-fill.svg?raw";
import ShoppingCartCheckoutOutlined from "@material-symbols/svg-700/rounded/shopping_cart_checkout.svg?raw";

// Icon type
export type Icon = "arrow_back" | "menu" | "photo_camera" | "favorite" |
  "arrow_forward" | "verified" | "lock" | "visibility" | "visibility_off" | 
  "home" | "diversity" | "dashboard" | "store" | "login" | "logout" | "account_circle" |
  "link" | "shopping_cart" | "badge" | "school" | "mail" | "add" | "remove" | "qr_code" |
  "footprint" | "shopping_cart_checkout";

/**
 * Material Icon
 * @param name Material Symbol Icon name
 * @param outlined Whether the icon is outlined or not
 */
export function icon(name: Icon, outlined: boolean = false) {
  // Back icon
  if (name === "arrow_back") return outlined ? ArrowBackOutlined : ArrowBack;
  // Menu icon
  if (name === "menu") return outlined ? MenuOutlined : Menu;
  // Photo Camera icon
  if (name === "photo_camera") return outlined ? PhotoCamera : PhotoCameraOutlined;
  // Favorite icon
  if (name === "favorite") return outlined ? FavoriteOutlined : Favorite;
  // Arrow Forward icon
  if (name === "arrow_forward") return outlined ? ArrowForwardOutlined : ArrowForward;
  // Verified icon
  if (name === "verified") return outlined ? VerifiedOutlined : Verified;
  // Lock icon
  if (name === "lock") return outlined ? LockOutlined : Lock;
  // Visibility icon
  if (name === "visibility") return outlined ? VisibilityOutlined : Visibility;
  // Visibility Off icon
  if (name === "visibility_off") return outlined ? VisibilityOffOutlined : VisibilityOff;
  // Home icon
  if (name === "home") return outlined ? HomeOutlined : Home;
  // Diversity icon
  if (name === "diversity") return outlined ? DiversityOutlined : Diversity;
  // Dashboard icon
  if (name === "dashboard") return outlined ? DashboardOutlined : Dashboard;
  // Store icon
  if (name === "store") return outlined ? StoreOutlined : Store;
  // Login icon
  if (name === "login") return outlined ? LoginOutlined : Login;
  // Logout icon
  if (name === "logout") return outlined ? LogoutOutlined : Logout;
  // Account Circle
  if (name === "account_circle") return outlined ? AccountCircleOutlined : AccountCircle;
  // Link
  if (name === "link") return outlined ? LinkOutlined : Link;
  // Shopping Cart
  if (name === "shopping_cart") return outlined ? ShoppingCartOutlined : ShoppingCart;
  // Badge
  if (name === "badge") return outlined ? BadgeOutlined : Badge;
  // School
  if (name === "school") return outlined ? SchoolOutlined : School;
  // Mail
  if (name === "mail") return outlined ? MailOutlined : Mail;
  // Add
  if (name === "add") return outlined ? AddOutlined : Add;
  // Remove
  if (name === "remove") return outlined ? RemoveOutlined : Remove;
  // QR Code
  if (name === "qr_code") return outlined ? QRCodeOutlined : QRCode;
  // Footprint Walk
  if (name === "footprint") return outlined ? FootprintOutlined : Footprint;
  // Shopping Cart Checkout
  if (name === "shopping_cart_checkout") return outlined ? ShoppingCartCheckoutOutlined : ShoppingCartCheckout;

  // Default
  return null;
}