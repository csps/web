<template>
  <div class="h-full bg-surface text-on-surface">
    <div class="relative -translate-y-20 w-full">
      <div class="relative w-full background">
        <div class="layer" />
      </div>
      <div class="absolute flex flex-col md:flex-row justify-center items-center top-0 w-full h-full">
        <img class="anim-1 w-[100px] sm:w-[150px]" :src="CSPSLogo" alt="CSPS Logo" />
        <div class="px-8 text-center md:text-left">
          <h4 class="anim-2 mt-5 text-sm sm:text-lg md:text-2xl font-medium text-on-secondary-container mb-2">
            Computing Society of the Philippines - Students
          </h4>
          <h5 class="text-sm sm:text-base text-on-surface">
            University of Cebu - Main Campus
          </h5>
        </div>
        <div class="w-full overflow-hidden absolute bottom-0 translate-y-1">
          <canvas ref="waveEl"></canvas>
        </div>
      </div>
    </div>

    <div class="-translate-y-20">
      <div class="container mx-auto pt-10 sm:pt-24">
        <div class="flex items-center justify-center gap-10">
          <div class="w-full lg:w-2/3 xl:w-1/2">
            <h1 class="title text-center lg:text-left anim-3 px-6">About us</h1>
            <p class="anim-4 welcome">
              Welcome to the  Computing Society of the Philippines - Students!
              We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus.
              Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits.
              Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!
            </p>
          </div>
          <div class="hidden lg:flex justify-center w-1/4">
            <img class="anim-5 shadow-primary-light-70 shadow-lg rounded-[28px]" :src="Image" alt="CSPS" />
          </div>
        </div>
        
        <div class="flex flex-col items-center justify-center mb-16 mt-24">
          <img class="anim-6 w-24 sm:w-32 mb-5" :src="CCSLogo" alt="CCS Logo" />
          <h1 class="anim-7 text-xl lg:text-2xl font-bold text-csps-primary text-center dark:text-on-surface-variant">
            College of Computer Studies
          </h1>
        </div>
      </div>

      <div class="container mx-auto px-6">
        <div class="flex justify-center">
          <div class="grid grid-cols-1 lg:grid-cols-3 justify-center relative anim-8 gap-5 lg:gap-10 mt-12 w-full xl:w-3/4">
            <div class="surface secondary">
              <h2 class="headline-small mb-3">Goals</h2>
              <p class="mb-5">We aim to cultivate a teaching-learning environment that:</p>
              <ul>
                <li>Promotes scholarly endeavors for the promotion of moral, social, cultural, and environmental interests.</li>
                <li>Meets the demands of the industry in terms of technical, personal, and interpersonal skills.</li>
                <li>Conducts intellectual, technological, and significant researches in computing.</li>
                <li>Optimizes the use of appropriate technologies in the delivery of instruction.</li>
                <li>Provides opportunities for faculty and students to participate in community extension services.</li>
              </ul>
            </div>
            <div class="grid gap-5 lg:gap-10">
              <div class="surface secondary">
                <h2 class="headline-small mb-3">Mission</h2>
                <p>
                  We envision being the hub of quality, globally-competitive and socially-responsive information technology education.
                </p>
              </div>
              <div class="surface secondary">
                <h2 class="headline-small mb-3">Vision</h2>
                <p class="mb-5">We commit to continuously:</p>
                <ul>
                  <li>Offer relevant programs that mold well-rounded computing professionals;</li>
                  <li>Engage in accreditation and quality standards; and </li>
                  <li>Facilitate in building an IT-enabled nation.</li>
                </ul>
              </div>
            </div>
            <div class="surface secondary">
              <h2 class="headline-small mb-3">Core Values</h2>
              <p class="mb-5">These are the core values that CCS believes in:</p>
              <ul>
                <li>Initiative (inceptum) wit, practicality, ingenuity</li>
                <li>Innovation (innovatio) technology, creativity, resourcefulness</li>
                <li>Integrity (integritas) honesty, trustworthiness, reliability</li>
                <li>Intelligence (intelligentia) wisdom, knowledge, expertise</li>
                <li>Interdependence (interdependentia) teamwork, cooperation, unity</li>
                <li>Industry (industria) diligence, perseverance, hard work</li>
              </ul>
            </div>
          </div>
        </div>
      
        <div class="flex flex-col items-center justify-center my-16 lg:my-24">
          <img class="anim-9 w-24 sm:w-32 mb-7" :src="UCLogo" alt="UC Logo" />
          <h1 class="anim-10 text-xl lg:text-2xl font-bold text-tertiary-20 dark:text-on-surface-variant text-center">
            University of Cebu
          </h1>
        </div>
        <div class="flex flex-col md:flex-row justify-center gap-5 lg:gap-10 anim-11">
          <div class="surface secondary md:w-1/2 xl:w-1/4">
            <h2 class="headline-small mb-3">Mission</h2>
            <p>
              The University offers affordable and quality education responsive to the demands of local and international communities.
            </p>
          </div>
          <div class="surface secondary md:w-1/2 xl:w-1/4">
            <h2 class="headline-small mb-3">Vision</h2>
            <p>
              Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
            </p>
          </div>
        </div>
      </div>

      <div class="pb-8">
        <div class="introduction">
          <h1 class="title mt-[150px] text-center anim-12">
            MEET THE <span class="text-csps-secondary dark:text-tertiary-80">CSPS OFFICERS!</span>
          </h1>

          <div class="flex justify-center relative anim-13">
            <div class="absolute top-0 left-0 right-0 bottom-0 officers h-full w-full z-[500]" />
            <swiper-container
              effect="coverflow"
              grab-cursor="true"
              centered-slides="true"
              round-lengths="true"
              autoplay-delay="3000"
              coverflow-effect-slide-shadows="false"
              class="officers-swiper py-4 lg:py-8 w-full overflow-hidden lg:overflow-visible"
              autoplay-disable-on-interaction="false"
            >
              <swiper-slide
                class="py-8"
                v-for="officer in officers"
                :key="officer.name"
              >
                <CardAbout class="mx-8 w-full md:w-1/3 xl:w-full" :title="officer.position">
                  <div class="flex flex-col items-center justify-center">
                    <img :src="officer.thumb" class="rounded-full w-64 mb-7 shadow-sm" loading="lazy" />
                    <h3 class="text-xl font-bold mb-1">{{ officer.name }}</h3>
                    <p class="text-lg text-center text-on-surface-variant font-normal">{{ officer.position }}</p>
                  </div>
                </CardAbout>
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Image from '~/assets/img/csps.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import CCSLogo from '~/assets/img/ccs_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import Jewel from '~/assets/img/profile/Jewel.jpg';
import Brian from '~/assets/img/profile/Brian.jpg';
import Jeremy from '~/assets/img/profile/Jeremy.jpg';
import Krisha from '~/assets/img/profile/Krisha.jpg';
import Leym from '~/assets/img/profile/Leym.jpg';
import Christine from '~/assets/img/profile/Christine.jpg';
import Enrico from '~/assets/img/profile/Enrico.jpg';
import Rybryb from '~/assets/img/profile/Rybryb.jpg';
import Andrian from '~/assets/img/profile/Andrian.jpg';

import type { SwiperContainer } from 'swiper/element';
import { ref, onMounted, watch } from 'vue';
import { register } from 'swiper/element/bundle';
import { useStore } from "~/store"; 
import wave from "~/utils/wave";

import CardAbout from '~/composables/CardAbout.vue';

const store = useStore();
const waveEl = ref();
const officers = [
  { name: "Jewel Cedrick Gesim", position: "President", thumb: Jewel },
  { name: "Brian Keith Lisondra", position: "VP - Internal", thumb: Brian },
  { name: "Jeremy Andy Ampatin", position: "VP - External", thumb: Jeremy },
  { name: "Krisha Mae Gabuya", position: "Secretary", thumb: Krisha },
  { name: "Enrico Bacalso", position: "Treasurer", thumb: Enrico },
  { name: "Marianne Leigh Reyes", position: "Assistant Treasurer", thumb: Leym },
  { name: "Christine Lange", position: "Auditor", thumb: Christine },
  { name: "Raymond Benedict Branzuela", position: "P.R.O", thumb: Rybryb },
  { name: "Andrian Paul Sedigo", position: "P.I.O", thumb: Andrian },
];

let wavifyInstance: {
  setColor: (color: string) => void;
};

register();

watch(() => store.isDark, v => {
  if (!wavifyInstance) return;
  wavifyInstance.setColor(v ? "#151216" : "#fff7fb");
})

onMounted(() => {
  wavifyInstance = wave(waveEl.value, store.isDark ? "#151216" : "#fff7fb");

  const swiper: SwiperContainer | null = document.querySelector('.officers-swiper');
  if (swiper === null) return;

  Object.assign(swiper, {
    slidesPerView: 1,
    spaceBetween: 0 ,
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      1280: {
        spaceBetween: 0,
        slidesPerView: 3,
      },
      1536: {
        spaceBetween: 0,
        slidesPerView: 4,
      },
    },
  });

  swiper.initialize();
});
</script>

.<style lang="scss" scoped>
.title {
  @apply text-csps-primary dark:text-on-background mb-8 font-bold text-2xl lg:text-3xl;
}

.welcome {
  @apply text-sm leading-7 md:text-base 2xl:text-lg text-justify md:leading-8 2xl:leading-[34px] px-6;
}

ul {
  @apply list-disc mt-3;

  li {
    @apply ml-6 pb-5 text-start leading-7 lg:leading-[30px];
  }
}

.background {
  @apply h-[375px] sm:h-[475px];

  .layer {
    @apply absolute top-0 left-0 w-full h-full bg-secondary-container opacity-100;
  }
}

.officers {
  @apply pointer-events-none;
  background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 30%, theme("colors.surface"));
}

.officers-swiper {
  --swiper-pagination-color: theme("colors.csps-primary");
}

swiper-slide {
  @apply flex justify-center;
}
</style>
