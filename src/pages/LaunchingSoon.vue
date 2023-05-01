<template>
  <div class="flex justify-center container mx-auto h-full overflow-hidden">
    <div id="parent" class="flex flex-col justify-center items-center h-full px-8 w-full lg:px-0 lg:w-1/2 pb-24">
  
      <img ref="logo" :src="Logo" class="logo" alt="CSPS-S UC Main Logo" />
      <h4>We're launching soon!</h4>
  
      <p>
        Welcome to the UC Main CSP-S official website!
        We appreciate your patience and understanding as we develop our website.

        <br><br>

        While we're working on building an amazing online space for you, you can stay connected with us through our social media accounts and online communities.
        You can find the links to our Facebook, Gmail, Discord, and Github by clicking on the icons below.

        <br><br>

        Stay updated on our latest events, activities, and announcements by following us on these platforms and feel free to reach out to us via email or facebook.
        Thank you for your support and stay tuned.
      </p>

      <div class="flex items-center space-x-5">
        <a v-for="(link, i) in links" :href="link.href" :key="i" target="_blank">
          <img :src="link.src" :alt="link.alt" class="w-8 sm:w-9" />
        </a>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import anime from "animejs";
import VanillaTilt from "vanilla-tilt";

import Logo from "~/assets/img/logo.png";

import FacebookSvg from "~/assets/svg/facebook.svg";
import MailSvg from "~/assets/svg/mail.svg";
import DiscordSvg from "~/assets/svg/discord.svg";
import GithubSvg from "~/assets/svg/github.svg";

const logo = ref(null);

const links = [
  { href: "https://web.facebook.com/UCMainCSPS", src: FacebookSvg, alt: "CSP-S UC Main Facebook Page" },
  { href: "mailto:ucmaincsps@gmail.com", src: MailSvg, alt: "CSP-S UC Main Email" },
  { href: "https://discord.gg/4k8bfSTV", src: DiscordSvg, alt: "CSP-S UC Main Discord Server" },
  { href: "https://github.com/csps", src: GithubSvg, alt: "CSP-S UC Main Github Organization" },
];

onMounted(() => {
  VanillaTilt.init(logo.value!, {
    "full-page-listening": true,
    "max-glare": 0.5,
    "reverse": true,
    "max": 20,
  });

  anime({
    targets: "#parent > *",
    scale: [0, 1],
    opacity: [0, 1],
    delay: anime.stagger(75, { start: 500 }),
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

.logo {
  @apply w-[200px] sm:w-[250px] border-4 rounded-full;
  border-color: $purple;
}

h4 {
  @apply text-2xl sm:text-3xl mt-8 mb-6 sm:my-8 font-bold ;
  color: $purple-container;
}

p {
  @apply text-sm sm:text-base text-white text-justify font-medium mb-10 leading-[23px] sm:leading-[32px];
}

a {
  @apply hover:scale-[1.30] hover:rotate-[360deg] transition-transform duration-500;
}
</style>