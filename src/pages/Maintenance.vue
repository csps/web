<template>
  <div class="w-full h-[100dvh] flex justify-center flex-col items-center px-6">
    <md-switch class="fixed top-5 right-10" @change="onThemeChange" :selected="store.isDark" icons>
      <md-icon slot="on-icon" v-html="icon('dark_mode')" />
      <md-icon slot="off-icon" v-html="icon('light_mode')" />
    </md-switch>

    <img :src="maintenance" class="w-[350px] object-contain" />

    <h2 class="text-lg md:text-2xl font-bold text-on-surface-variant mb-2 text-center">
      Oops! We're under maintenance!
    </h2>
    <p class="text-sm text-outline md:text-base text-center">
      We're moving our servers to a new location. We'll be back soon!
    </p>

    <div class="flex items-center space-x-2 md:space-x-5 mt-4">
      <a v-for="(link, i) in links" :href="link.href" :key="i" target="_blank" v-html="link.src" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/switch/switch";

import maintenance from '~/assets/svg/maintenance.svg';
import FacebookSvg from "~/assets/svg/facebook.svg?raw";
import MailSvg from "~/assets/svg/mail.svg?raw";
import DiscordSvg from "~/assets/svg/discord.svg?raw";
import GithubSvg from "~/assets/svg/github.svg?raw";

import { setDarkMode } from "~/utils/theme";
import { useStore } from "~/store";
import { icon } from "~/utils/icon";
import { onMounted } from "vue";
import { getStore } from "~/utils/storage";

const links = [
  { href: "https://web.facebook.com/UCMainCSPS", src: FacebookSvg, alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: MailSvg, alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/w3BPVTQUWd", src: DiscordSvg, alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: GithubSvg, alt: "CSP-S UC Main Github Organization" },
];

const store = useStore();

onMounted(() => {
  store.isDark = getStore("dark") === "1";
  setDarkMode(store.isDark);
  store.isLoading = false;
});

function onThemeChange() {
  store.isDark = !store.isDark;
  setDarkMode(store.isDark);
}
</script>

<style lang="scss" scoped>
a {
  @apply scale-[0.6] hover:scale-[0.8] md:scale-[0.8] md:hover:scale-[1] hover:rotate-[360deg] transition-transform duration-500 text-outline;
}
</style>