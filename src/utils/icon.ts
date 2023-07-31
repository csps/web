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

// Icon type
type Icon = "arrow_back" | "menu" | "photo_camera" | "favorite" |
  "arrow_forward" | "verified" | "lock" | "visibility" | "visibility_off";

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

  // Default
  return null;
}
