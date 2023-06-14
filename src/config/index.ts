import FacebookSvg from "~/assets/svg/facebook.svg?raw";
import MailSvg from "~/assets/svg/mail.svg?raw";
import DiscordSvg from "~/assets/svg/discord.svg?raw";
import GithubSvg from "~/assets/svg/github.svg?raw";

import { getSvgData } from "~/utils/string";

export const NAV_LINKS = [
  { name: 'Home', path: '/home' },
  { name: 'About Us', path: '/about' },
  { name: 'Bulletin Board', path: '/bulletin' },
  { name: 'Shop', path: '/shop' },
  { name: 'Login', path: '/login' },
];

export const SOCIAL_LINKS = [
  { href: "https://web.facebook.com/UCMainCSPS", src: getSvgData(FacebookSvg), alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: getSvgData(MailSvg), alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/4k8bfSTV", src: getSvgData(DiscordSvg), alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: getSvgData(GithubSvg), alt: "CSP-S UC Main Github Organization" },
];
