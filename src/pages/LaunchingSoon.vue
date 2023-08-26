<template>
  <div class="flex justify-center container mx-auto h-full overflow-hidden">
    <div id="parent" class="flex flex-col pt-12 2xl:pt-24 items-center h-full px-8 w-full lg:px-0 lg:w-1/2 pb-24">
      
      <div class="logo-container">
        <img :src="CCSLogo" alt="CCS UC Logo" />
        <img :src="CSPSLogo" alt="CSPS-S UC Main Logo" />
        <img :src="UCLogo" alt="UC Logo" />
      </div>
      <h4>We're launching soon!</h4>
  
      <p>
        Welcome to the official Website of UC Main CSP-S!
        We appreciate your patience and understanding as we develop our website.

        <br><br>

        While we're working on building an amazing online space for you, you can stay connected with us through our social media accounts and online communities.
        You can find the links to our Facebook, Gmail, Discord, and Github by clicking on the icons below.

        <br><br>

        Stay updated on our latest events, activities, and announcements by following us on these platforms and feel free to reach out to us via email or facebook.
        Thank you for your support and stay tuned.
      </p>

      <div class="flex items-center space-x-7">
        <a v-for="(link, i) in links" :href="link.href" :key="i" target="_blank">
          <img :src="link.src" :alt="link.alt" class="w-8 sm:w-9" />
        </a>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import anime from "animejs";

import CCSLogo from "~/assets/img/ccs_logo.png";
import CSPSLogo from "~/assets/img/csps_logo.png";
import UCLogo from "~/assets/img/uc_logo.png";

import FacebookSvg from "~/assets/svg/facebook.svg";
import MailSvg from "~/assets/svg/mail.svg";
import DiscordSvg from "~/assets/svg/discord.svg";
import GithubSvg from "~/assets/svg/github.svg";

const links = [
  { href: "https://web.facebook.com/UCMainCSPS", src: FacebookSvg, alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: MailSvg, alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/v4jprGq3", src: DiscordSvg, alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: GithubSvg, alt: "CSP-S UC Main Github Organization" },
];

onMounted(() => {
  anime({
    targets: "#parent > *",
    translateX: [-270, 0],
    opacity: [0, 1],
    delay: anime.stagger(50, {
      easing: 'linear'
    }),
  });
});
</script>

<style lang="scss" scoped>
@import "~/scss/variables";

#parent {
  animation: 2s linear infinite alternate updown;
}

@keyframes updown {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(20px);
  }
}

img {
  -webkit-user-drag: none;
}

.logo-container {
  @apply flex justify-center space-x-5 lg:space-x-10;

  img {
    @apply w-[90px] sm:w-[125px] lg:w-[150px];
  }
}

h4 {
  @apply text-2xl lg:text-3xl mt-8 mb-6 sm:my-8 font-bold ;
  color: $purple-container;
}

p {
  @apply text-sm lg:text-base text-white text-justify font-medium mb-12 leading-[23px] lg:leading-[32px];
}

a {
  @apply hover:scale-[1.30] hover:rotate-[360deg] transition-transform duration-500;
}
</style>
