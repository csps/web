<template>
  <div class="flex items-end z-0">
    <footer class="w-screen px-6 py-12 flex flex-col justify-center z-[1000] text-on-surface-variant">
      <div class="flex flex-col justify-center items-center gap-x-10 gap-y-5">
        <div class="flex flex-col">
          <!-- <div class="hidden sm:block text-xs text-center mt-4 mb-2 text-outline">
            Copyright &copy; {{ year }}. All rights reserved.
          </div> -->
  
          <div class="flex items-center justify-center space-x-5 mt-2" tabindex="-1">
            <a class="relative outline-none" v-for="(link, i) in links" :href="link.href" :key="i" target="_blank">
              <md-focus-ring />
              <img :src="link.src" :alt="link.alt" class="w-5 sm:w-6" tabindex="-1" />
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

        <!-- <div class="block sm:hidden text-xs text-outline">
          Copyright &copy; {{ year }}. All rights reserved.
        </div> -->
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import FacebookSvg from "~/assets/svg/facebook.svg";
import MailSvg from "~/assets/svg/mail.svg";
import DiscordSvg from "~/assets/svg/discord.svg";
import GithubSvg from "~/assets/svg/github.svg";

import "@material/web/focus/md-focus-ring";

// const year = new Date().getFullYear();

const links = [
  { href: "https://web.facebook.com/UCMainCSPS", src: FacebookSvg, alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: MailSvg, alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/v4jprGq3", src: DiscordSvg, alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: GithubSvg, alt: "CSP-S UC Main Github Organization" },
];
</script>

<style lang="scss" scoped>
a {
  @apply hover:scale-[1.30] hover:rotate-[360deg] transition-transform duration-500;

  img {
    @apply rounded-none;
  }
}
</style>
