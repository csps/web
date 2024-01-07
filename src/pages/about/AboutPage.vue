<template>
  <div>
    <img class="md:scale-[700%] w-full h-full absolute md:top-0 filter right-[0.6%] dark:contrast-50 -z-[10] opacity-[3%] dark:opacity-10" :src="CSPSLogo" alt="Logo" />
    <VMouse class="invisible 2xl:visible absolute bottom-[5%] left-1/2 -translate-x-1/2" />
    <VFullpage inner>
      <section>
        <div class="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
          <div class="flex justify-center flex-col items-center w-full lg:w-2/3 2xl:w-1/2 ">
            <img class="w-3/4 md:w-2/3" :src="store.isDark ? CSPSCoverDark : CSPSCoverLight" alt="CSPS Logo" data-sal="slide-right" data-sal-repeat />
            <p ref="intro" class="text-justify w-full text-sm md:text-base leading-7 md:leading-9 mt-7 text-on-surface" data-sal="slide-right" data-sal-repeat>
              
            </p>
          </div>
        </div>
      </section>

      <section>
        <div class="w-full">
          <h1 class="headline-small text-csps-primary dark:text-secondary font-semibold text-center" data-sal="zoom-in" data-sal-repeat>
            MEET THE <span class="text-csps-secondary dark:text-tertiary-80">CSPS OFFICERS!</span>
          </h1>
  
          <div class="relative">
            <swiper-container
              effect="coverflow"
              grab-cursor="true"
              centered-slides="true"
              round-lengths="true"
              autoplay-delay="3000"
              coverflow-effect-slide-shadows="false"
              data-sal="zoom-in" data-sal-repeat
              class="officers-swiper w-full py-4 lg:py-8 overflow-hidden lg:overflow-visible flex justify-center"
              autoplay-disable-on-interaction="false"
            >
              <swiper-slide
                v-for="officer in officers"
                :key="officer.name"
                class="rounded-3xl my-10"
              >
                <CardOfficer class="mx-6 sm:mx-20 md:mx-4 lg:mx-6 shadow-md" :officer="officer" />
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </section>
      
      <section>
        <div class="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <div class="flex flex-col items-center justify-center" data-sal="slide-right" data-sal-repeat>
            <img class="w-24 sm:w-32 mb-5" :src="CCSLogo" alt="CCS Logo" />
            <h1 class="text-xl lg:text-2xl font-semibold text-csps-primary text-center dark:text-on-surface-variant">
              College of Computer Studies
            </h1>
          </div>
  
          <div class="flex justify-center">
            <div class="grid grid-cols-1 lg:grid-cols-3 justify-center relative gap-5 lg:gap-10 mt-12 w-full xl:w-3/4 body-medium">
              <div class="surface high" data-sal="slide-right" data-sal-repeat>
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
                <div class="surface high" data-sal="zoom-in" data-sal-repeat>
                  <h2 class="headline-small mb-3">Mission</h2>
                  <p>
                    We envision being the hub of quality, globally-competitive and socially-responsive information technology education.
                  </p>
                </div>
                <div class="surface high" data-sal="zoom-in" data-sal-repeat>
                  <h2 class="headline-small mb-3">Vision</h2>
                  <p class="mb-5">We commit to continuously:</p>
                  <ul>
                    <li>Offer relevant programs that mold well-rounded computing professionals;</li>
                    <li>Engage in accreditation and quality standards; and </li>
                    <li>Facilitate in building an IT-enabled nation.</li>
                  </ul>
                </div>
              </div>
              <div class="surface high" data-sal="slide-left" data-sal-repeat>
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
        </div>
      </section>
  
      <section>
        <div class="container mx-auto px-6 relative">
          <div class="flex flex-col items-center justify-center mb-8" data-sal="zoom-in" data-sal-repeat>
            <img class="w-24 sm:w-32" :src="UCLogo" alt="UC Logo" />
            <h1 class="text-xl lg:text-2xl font-semibold text-center text-csps-tertiary dark:text-on-surface-variant mt-5">
              University of Cebu
            </h1>
          </div>
          <div class="flex flex-col md:flex-row justify-center gap-5 lg:gap-10 body-medium">
            <div class="surface tertiary md:w-1/2 xl:w-1/4" data-sal="slide-right" data-sal-repeat>
              <h2 class="headline-small mb-3">Mission</h2>
              <p>
                The University offers affordable and quality education responsive to the demands of local and international communities.
              </p>
            </div>
            <div class="surface tertiary md:w-1/2 xl:w-1/4" data-sal="slide-left" data-sal-delay="100" data-sal-repeat>
              <h2 class="headline-small mb-3">Vision</h2>
              <p>
                Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </VFullpage>
  </div>
</template>

<script lang="ts" setup>
import CCSLogo from '~/assets/img/ccs_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';
import CSPSLogo from "~/assets/svg/csps.svg";
import CSPSCoverLight from "~/assets/svg/csps_cover_light.svg";
import CSPSCoverDark from "~/assets/svg/csps_cover_dark.svg";

import Gesim from '~/assets/img/profile/csps_gesim.jpg';
import Lisondra from '~/assets/img/profile/csps_lisondra.jpg';
import Ampatin from '~/assets/img/profile/csps_ampatin.jpg';
import Gabuya from '~/assets/img/profile/csps_gabuya.jpg';
import Reyes from '~/assets/img/profile/csps_reyes.jpg';
import Lange from '~/assets/img/profile/csps_lange.jpg';
import Bacalso from '~/assets/img/profile/csps_bacalso.jpg';
import Branzuela from '~/assets/img/profile/csps_branzuela.jpg';
import Sedigo from '~/assets/img/profile/csps_sedigo.jpg';
import Fabroa from '~/assets/img/profile/csps_fabroa.jpg';
import Tonilon from '~/assets/img/profile/csps_tonilon.jpg';

import type { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';
import { ref, onMounted } from 'vue';
import { useStore } from '~/store';
import Typed from 'typed.js';
import sal from "sal.js";

import CardOfficer from '~/composables/CardOfficer.vue';
import VFullpage from '~/components/VFullpage.vue';
import VMouse from "~/components/VMouse.vue";

let instance: Typed | undefined;

const intro = ref();
const store = useStore();
const officers: Officer[] = [
  { name: "Jewel Cedrick Gesim", position: "President", thumb: Gesim },
  { name: "Brian Keith Lisondra", position: "VP - Internal", thumb: Lisondra },
  { name: "Jeremy Andy Ampatin", position: "VP - External", thumb: Ampatin },
  { name: "Krisha Mae Gabuya", position: "Secretary", thumb: Gabuya },
  { name: "Enrico Bacalso", position: "Treasurer", thumb: Bacalso },
  { name: "Marianne Leigh Reyes", position: "Assistant Treasurer", thumb: Reyes },
  { name: "Christine Lange", position: "Auditor", thumb: Lange },
  { name: "Raymond Benedict Branzuela", position: "P.R.O", thumb: Branzuela },
  { name: "Andrian Paul Sedigo", position: "P.I.O", thumb: Sedigo },
  { name: "Maverick Fabroa", position: "Project Manager", thumb: Fabroa },
  { name: "Michael Tonilon", position: "Developer", thumb: Tonilon },
];

const message = `
  Welcome to the  Computing Society of the Philippines - Students!^750
  We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus. ^750
  Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits. ^750
  Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!
`;

register();

onMounted(() => {
  sal();

  const swiper: SwiperContainer | null = document.querySelector('.officers-swiper');
  if (swiper === null) return;

  Object.assign(swiper, {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      520: {
        spaceBetween: 0,
        slidesPerView: 1,
      },
      768: {
        spaceBetween: 0,
        slidesPerView: 2,
      },
      1024: {
        spaceBetween: 0,
        slidesPerView: 3,
      },
      1280: {
        spaceBetween: 0,
        slidesPerView: 4,
      },
    },
  });

  swiper.initialize();
  startTyped();
});

function startTyped() {
  if (instance) {
    instance.destroy();
  }

  instance = new Typed(intro.value, {
    strings: [ message ],
    typeSpeed: 15,
    showCursor: false,
  });
}
</script>

<style lang="scss" scoped>
.title {
  @apply mb-8 font-semibold text-2xl lg:text-3xl;
}

ul {
  @apply list-disc mt-3;

  li {
    @apply ml-6 pb-2 lg:pb-3 text-start leading-6;
  }
}

.background {
  @apply h-[375px] sm:h-[450px];

  .layer {
    @apply absolute top-0 left-0 w-full h-full bg-surface-container-low opacity-100;
  }
}

.officers-swiper {
  --swiper-pagination-color: theme("colors.csps-primary");
}
</style>
