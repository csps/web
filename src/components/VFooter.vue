<template>
  <footer class="w-screen px-6 py-12 flex flex-col justify-center z-[1000]">
    <div class="flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-5">
      <div class="flex items-center gap-5">
        <img :src="CSPSLogo" alt="logo" class="w-14 h-14 sm:w-16 sm:h-16">
        <div>
          <p class="text-sm sm:text-base md:text-lg mb-1 text-gray-200 font-medium">
            Computing Society of the Philippines - Students
          </p>
          <p class="text-xs text-primary-light-70">
            University of Cebu - Main Campus
          </p>
        </div>
      </div>
  
      <div class="block md:hidden text-xs text-primary-light-70">
        Copyright &copy; {{ year }}. All rights reserved.
      </div>
      
      <div class="flex flex-col">
        <div class="hidden md:block text-xs text-primary-light-70 text-center mt-4 mb-2">
          Copyright &copy; {{ year }}. All rights reserved.
        </div>

        <div class="flex items-center justify-center space-x-5 mt-2">
          <a v-for="(link, i) in links" :href="link.href" :key="i" target="_blank">
            <img :src="link.src" :alt="link.alt" class="w-5 sm:w-6" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import CSPSLogo from '~/assets/img/csps_logo.png';
import FacebookSvg from "~/assets/svg/facebook.svg";
import MailSvg from "~/assets/svg/mail.svg";
import DiscordSvg from "~/assets/svg/discord.svg";
import GithubSvg from "~/assets/svg/github.svg";

const year = new Date().getFullYear();

const links = [
  { href: "https://web.facebook.com/UCMainCSPS", src: FacebookSvg, alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: MailSvg, alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/4k8bfSTV", src: DiscordSvg, alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: GithubSvg, alt: "CSP-S UC Main Github Organization" },
];
</script>

<style lang="scss" scoped>
a {
  @apply hover:scale-[1.30] hover:rotate-[360deg] transition-transform duration-500 ;
}

.footer {
  height: 500px;
  background-image: url("~/assets/img/background.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .layer {
    @apply absolute top-0 left-0 w-full h-full bg-csps-primary/90;
  }
}
</style>
