import FacebookSvg from "~/assets/svg/facebook.svg?raw";
import MailSvg from "~/assets/svg/mail.svg?raw";
import DiscordSvg from "~/assets/svg/discord.svg?raw";
import GithubSvg from "~/assets/svg/github.svg?raw";

import { getSvgData } from "~/utils/string";
import { Icon } from "~/utils/icon";

interface Map {
  [key: string]: string | number
}

interface StringMap {
  [key: string]: string
}


export const NAV_LINKS: {
  name: string,
  path: string,
  icon: Icon
}[] = [
  { name: 'Home', path: '/', icon: "home" },
  { name: 'About Us', path: '/about', icon: "diversity" },
  { name: 'Bulletin Board', path: '/bulletin', icon: "ballot" },
  { name: 'Merch', path: '/merch', icon: "store" },
];

export const SOCIAL_LINKS = [
  { href: "https://web.facebook.com/UCMainCSPS", src: getSvgData(FacebookSvg), alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: getSvgData(MailSvg), alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/4k8bfSTV", src: getSvgData(DiscordSvg), alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: getSvgData(GithubSvg), alt: "CSP-S UC Main Github Organization" },
];

export const Config: Map = {
  API_URL: process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "http://103.44.234.157:3000",
  initialHistoryLength: 0
};

export const Env: StringMap = {
  
};