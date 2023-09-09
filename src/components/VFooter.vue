<template>
  <div class="flex items-end z-" :class="{ 'bg-surface-variant dark:bg-surface-container-high': route.name === 'Home' }">
    <footer class="w-screen px-6 py-12 flex flex-col justify-center z-[1000] text-on-surface-variant">
      <div class="flex flex-col justify-center items-center gap-x-10 gap-y-2">
        <div class="flex flex-col">
          <div class="flex items-center justify-center space-x-5 mt-2 mb-2" tabindex="-1">
            <a class="relative outline-none w-6 h-6" v-for="(link, i) in links" :href="link.href" :key="i" target="_blank">
              <md-focus-ring />
              <md-icon v-html="link.src" />
            </a>
          </div>
        </div>
        <div class="flex flex-col items-center gap-5">
          <div class="text-center">
            <p class="text-sm sm:text-base mb-1 font-medium">
              Computing Society of the Philippines - Students
            </p>
            <p class="text-xs">
              University of Cebu - Main Campus
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

import FacebookSvg from "~/assets/svg/facebook.svg?raw";
import MailSvg from "~/assets/svg/mail.svg?raw";
import DiscordSvg from "~/assets/svg/discord.svg?raw";
import GithubSvg from "~/assets/svg/github.svg?raw";

import "@material/web/icon/icon";

const route = useRoute();

const links = [
  { href: "https://web.facebook.com/UCMainCSPS", src: FacebookSvg, alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: MailSvg, alt: "CSP-S UC Main Email" },
  { href: "https://discord.com/invite/w3BPVTQUWd", src: DiscordSvg, alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: GithubSvg, alt: "CSP-S UC Main Github Organization" },
];
</script>

<style lang="scss" scoped>
a md-icon {
  @apply hover:scale-[1.30] hover:rotate-[360deg] transition-transform duration-500;

  img {
    @apply rounded-none;
  }
}
</style>
