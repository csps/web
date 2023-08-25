<template>
  <div class="h-full relative w-full">
    
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pb-10 2xl:p-12 px-6" data-sal="zoom-in" data-sal-repeat>
        <div class="flex flex-col items-center px-8 text-center mt-2">
          <h4 class="mt-2 text-base md:text-2xl text-on-surface-variant mb-2 md:mb-3 font-bold">
            Computing Society of the Philippines - Students
          </h4>
          <h5 class="text-sm md:text-base text-outline">
            University of Cebu - Main Campus
          </h5>
          <img :src="CSPSLogo" class="w-[150px] my-5" alt="CSPS Logo" />
        </div>
        <div class="flex items-center justify-center gap-10 mt-10">
          <div class="w-full lg:w-2/3 xl:w-1/2">
            <p class="welcome">
              Welcome to the  Computing Society of the Philippines - Students!
              We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus.
              Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits.
              Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="container mx-auto">
        
        <div class="flex flex-col items-center justify-center mb-16 mt-48" data-sal="zoom-in" data-sal-repeat>
          <img class="w-24 sm:w-32 mb-5" :src="CCSLogo" alt="CCS Logo" />
          <h1 class="text-xl lg:text-2xl font-bold text-csps-primary text-center dark:text-on-surface-variant">
            College of Computer Studies
          </h1>
        </div>
      </div>

      <div class="container mx-auto px-6 overflow-x-hidden">
        <div class="flex justify-center">
          <div class="grid grid-cols-1 lg:grid-cols-3 justify-center relative gap-5 lg:gap-10 mt-12 w-full xl:w-3/4">
            <div class="surface secondary" data-sal="slide-right" data-sal-repeat>
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
              <div class="surface secondary" data-sal="zoom-in" data-sal-repeat>
                <h2 class="headline-small mb-3">Mission</h2>
                <p>
                  We envision being the hub of quality, globally-competitive and socially-responsive information technology education.
                </p>
              </div>
              <div class="surface secondary" data-sal="zoom-in" data-sal-repeat>
                <h2 class="headline-small mb-3">Vision</h2>
                <p class="mb-5">We commit to continuously:</p>
                <ul>
                  <li>Offer relevant programs that mold well-rounded computing professionals;</li>
                  <li>Engage in accreditation and quality standards; and </li>
                  <li>Facilitate in building an IT-enabled nation.</li>
                </ul>
              </div>
            </div>
            <div class="surface secondary" data-sal="slide-left" data-sal-repeat>
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
      
        <div class="flex flex-col items-center justify-center my-16 lg:my-24" data-sal="zoom-in" data-sal-repeat>
          <img class="w-24 sm:w-32 mb-7" :src="UCLogo" alt="UC Logo" />
          <h1 class="text-xl lg:text-2xl font-bold text-center text-csps-primary dark:text-on-surface-variant">
            University of Cebu
          </h1>
        </div>
        <div class="flex flex-col md:flex-row justify-center gap-5 lg:gap-10 ">
          <div class="surface secondary md:w-1/2 xl:w-1/4" data-sal="slide-right" data-sal-repeat>
            <h2 class="headline-small mb-3">Mission</h2>
            <p>
              The University offers affordable and quality education responsive to the demands of local and international communities.
            </p>
          </div>
          <div class="surface secondary md:w-1/2 xl:w-1/4" data-sal="slide-left" data-sal-delay="100" data-sal-repeat>
            <h2 class="headline-small mb-3">Vision</h2>
            <p>
              Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
            </p>
          </div>
        </div>
      </div>

      <div class="pb-8">
        <div class="introduction">
          <h1 class="text-2xl text-csps-primary dark:text-secondary font-bold mt-[150px] text-center" data-sal="zoom-in" data-sal-repeat>
            MEET THE <span class="text-csps-secondary dark:text-tertiary-80">CSPS OFFICERS!</span>
          </h1>

          <div class="relative">
            <div class="absolute top-0 left-0 right-0 bottom-0 officers h-full w-full z-[500]" />
            <swiper-container
              effect="coverflow"
              grab-cursor="true"
              centered-slides="true"
              round-lengths="true"
              autoplay-delay="3000"
              coverflow-effect-slide-shadows="false"
              data-sal="zoom-in" data-sal-repeat
              class="officers-swiper w-full py-4 lg:py-8 overflow-hidden lg:overflow-visible"
              autoplay-disable-on-interaction="false"
            >
              <swiper-slide
                class="py-8 w-fit h-auto"
                v-for="officer in officers"
                :key="officer.name"
              >
                <CardAbout class="mx-8 w-full md:w-1/3 xl:w-full" :title="officer.position">
                  <div class="flex flex-col items-center justify-center">
                    <img :src="officer.thumb" class="rounded-full w-64 mb-7 shadow-sm filter saturate-[0.8]" loading="lazy" />
                    <h3 class="text-xl mb-2 font-bold">{{ officer.name }}</h3>
                    <p class="text-base text-center text-on-surface-variant font-medium">{{ officer.position }}</p>
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
import CCSLogo from '~/assets/img/ccs_logo.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
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
import { register } from 'swiper/element/bundle';
import { onMounted } from 'vue';
import sal from "sal.js";

import CardAbout from '~/composables/CardAbout.vue';

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

register();

onMounted(() => {
  sal();

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
  @apply mb-8 font-bold text-2xl lg:text-3xl;
}

.welcome {
  @apply text-sm leading-7 md:text-base text-justify md:leading-8 2xl:leading-[34px] px-6;
}

ul {
  @apply list-disc mt-3;

  li {
    @apply ml-6 pb-5 text-start leading-7 lg:leading-[30px];
  }
}

.background {
  @apply h-[375px] sm:h-[450px];

  .layer {
    @apply absolute top-0 left-0 w-full h-full bg-surface-container-low opacity-100;
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