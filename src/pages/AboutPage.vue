<template>
  <div class="h-full bg-primary-light-90">
    <div class="relative -translate-y-20 w-full">
      <div class="relative w-full background">
        <div class="layer" />
      </div>
      <div class="absolute flex flex-col justify-center items-center top-0 w-full h-full pb-5">
        <img class="anim-1 w-[150px] sm:w-[200px]" :src="CSPSLogo" alt="CSPS Logo" />
        <h4 class="anim-2 mt-10 text-lg px-8 sm:text-2xl lg:text-3xl font-bold text-primary-light-90 text-center">
          Computing Society of the Philippines - Students
        </h4>
        <svg class="absolute -bottom-1 z-10" height="100" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs></defs>
          <path ref="wavifyEl" d=""/>
        </svg>
      </div>
    </div>

    <div class="-translate-y-20 bg-primary-light-90">
      <div class="container mx-auto pt-10">
        <div class="grid gap-10 grid-cols-1 lg:grid-cols-2">
          <div class="flex items-center flex-col justify-center">
            <h1 class="title text-center lg:text-left w-full anim-3 px-6">About us</h1>
            <p class="anim-4 welcome">
              Welcome to the  Computing Society of the Philippines - Students (CSP-S)! We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus. Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits.
              Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!
            </p>
          </div>
          <div class="flex justify-center px-6">
            <img class="anim-5 shadow-primary-light-70 shadow-lg rounded-[32px]" id="csps" :src="Image" />
          </div>
        </div>
        
        <div class="flex flex-col items-center justify-center mb-16 mt-24">
          <img class="anim-6 w-32 mb-5" :src="CCSLogo" alt="CCS Logo" />
          <h1 class="anim-7 text-xl lg:text-2xl font-bold text-primary" style="text-align: center;">College of Computer Studies</h1>
        </div>
      </div>

      <div class="flex justify-center relative anim-8">
        <div class="absolute top-0 left-0 right-0 bottom-0 slides h-full w-full z-[500]" />
        <swiper-container
          class="swiper-1 w-full overflow-visible swiper"
          effect="coverflow"
          slides-per-view="3"
          centered-slides="true"
          round-lengths="true"
          coverflow-effect-slide-shadows="false"
          grab-cursor="true"
        >
          <swiper-slide class="py-16">
            <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" title="Mission">
              We envision being the hub of quality, globally-competitive and socially-responsive information technology education.
            </CardAbout>
          </swiper-slide>
          <swiper-slide class="py-16">
            <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" title="Vision">
              <p class="mb-5">We commit to continuously:</p>
              <ul>
                <li>Offer relevant programs that mold well-rounded computing professionals;</li>
                <li>Engage in accreditation and quality standards; and </li>
                <li>Facilitate in building an IT-enabled nation.</li>
              </ul>
            </CardAbout>
          </swiper-slide>
          <swiper-slide class="py-16">
            <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" title="Goals">
              <p class="mb-5">We aim to cultivate a teaching-learning environment that:</p>
              <ul>
                <li>Promotes scholarly endeavors for the promotion of moral, social, cultural, and environmental interests.</li>
                <li>Meets the demands of the industry in terms of technical, personal, and interpersonal skills.</li>
                <li>Conducts intellectual, technological, and significant researches in computing.</li>
                <li>Optimizes the use of appropriate technologies in the delivery of instruction.</li>
                <li>Provides opportunities for faculty and students to participate in community extension services.</li>
              </ul>
            </CardAbout>
          </swiper-slide>
          <swiper-slide class="py-16">
            <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" title="Core Values">
              <p class="mb-5">These are the core values that CCS believes in:</p>
              <ul>
                <li>Initiative (inceptum) wit, practicality, ingenuity</li>
                <li>Innovation (innovatio) technology, creativity, resourcefulness</li>
                <li>Integrity (integritas) honesty, trustworthiness, reliability</li>
                <li>Intelligence (intelligentia) wisdom, knowledge, expertise</li>
                <li>Interdependence (interdependentia) teamwork, cooperation, unity</li>
                <li>Industry (industria) diligence, perseverance, hard work</li>
              </ul>
            </CardAbout>
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="container mx-auto">
        <div class="flex flex-col items-center justify-center mb-16 mt-24">
          <img class="anim-9 w-36 mb-7" :src="UCLogo" alt="UC Logo" />
          <h1 class="anim-10 text-2xl font-bold text-primary" style="text-align: center;">University of Cebu</h1>
        </div>
      </div>

      <div class="relative anim-11">
        <div class="absolute top-0 left-0 right-0 bottom-0 slides h-full w-full z-[500]" />
        <swiper-container
          effect="coverflow"
          grab-cursor="true"
          round-lengths="true"
          centered-slides="true"
          coverflow-effect-slide-shadows="false"
          class="swiper-2 py-4 lg:py-8 w-full overflow-hidden lg:overflow-visible"
        >
          <swiper-slide class="p-3">
            <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" title="Mission">
              The University offers affordable and quality education responsive to the demands of local and international communities.
            </CardAbout>
          </swiper-slide>
          <swiper-slide class="p-3">
            <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" title="Vision">
              Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
            </CardAbout>
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="pb-8">
        <div class="introduction">
          <h1 class="title pb-[50px] pt-[100px] text-center anim-12">
            MEET THE <span class="text-secondary">CSPS OFFICERS!</span>
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
              class="officers-swiper swiper-3 py-4 lg:py-8 w-full overflow-hidden lg:overflow-visible"
              autoplay-disable-on-interaction="false"
            >
              <swiper-slide
                class="py-8"
                v-for="officer in officers"
                :key="officer.name"
              >
                <CardAbout class="mx-8 w-full sm:w-1/2 2xl:w-full" :title="officer.position">
                  <div class="flex flex-col items-center justify-center">
                    <img :src="officer.thumb" class="rounded-full w-64 mb-7" loading="lazy" />
                    <h3 class="text-xl font-bold text-primary mb-2">{{ officer.name }}</h3>
                    <p class="text-lg text-center">{{ officer.position }}</p>
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

import { ref, onMounted } from 'vue';
import { wavify } from '~/utils/wavify';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

import CardAbout from '~/composables/CardAbout.vue';

gsap.registerPlugin(ScrollTrigger);

const wavifyEl = ref();
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
  wavify(wavifyEl.value, {
    height: 50,
    bones: 6,
    amplitude: 30,
    color: "rgb(237, 233, 238)",
    speed: .25,
  });

  const fromAnim = {
    x: -100,
    opacity: 0,
  };

  const toAnim = {
    x: 0,
    stagger: 0.2,
    opacity: 1,
  };

  gsap.fromTo([".anim-1", ".anim-2", ".anim-3", ".anim-4", ".anim-5"], fromAnim, toAnim);
  gsap.fromTo([".anim-6", ".anim-7"], fromAnim, {
    ...toAnim,
    scrollTrigger: {
      trigger: ".anim-6",
      start: "top 60%",
      end: "bottom center",
    },
  });
  
  gsap.fromTo(".anim-8", fromAnim, {
    ...toAnim,
    scrollTrigger: {
      trigger: ".anim-8",
      start: "top center",
      end: "bottom center",
    },
  });
  
  gsap.fromTo([".anim-9", ".anim-10"], fromAnim, {
    ...toAnim,
    scrollTrigger: {
      trigger: ".anim-9",
      start: "top 60%",
      end: "bottom center",
    },
  });

  gsap.fromTo(".anim-11", fromAnim, {
    ...toAnim,
    scrollTrigger: {
      trigger: ".anim-11",
      start: "top center",
      end: "bottom center",
    },
  });

  gsap.fromTo(".anim-12", fromAnim, {
    ...toAnim,
    scrollTrigger: {
      trigger: ".anim-12",
      start: "top 50%",
      end: "bottom center",
    },
  });

  gsap.fromTo(".anim-13", fromAnim, {
    ...toAnim,
    scrollTrigger: {
      trigger: ".anim-13",
      start: "top center",
      end: "bottom center",
    },
  });

  const swiper1: SwiperContainer | null = document.querySelector('.swiper-1');
  if (swiper1 === null) return;

  Object.assign(swiper1, {
    slidesPerView: 1,
    spaceBetween: 100,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1536: {
        slidesPerView: 3,
      },
    },
  });

  const swiper2: SwiperContainer | null = document.querySelector('.swiper-2');
  if (swiper2 === null) return;

  Object.assign(swiper2, {
    slidesPerView: 1,
    spaceBetween: 100,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1536: {
        slidesPerView: 3,
      },
    },
  });

  const swiper3: SwiperContainer | null = document.querySelector('.swiper-3');
  if (swiper3 === null) return;

  Object.assign(swiper3, {
    slidesPerView: 1,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1536: {
        slidesPerView: 4,
      },
    },
  });

  swiper1.initialize();
  swiper2.initialize();
  swiper3.initialize();
});
</script>

.<style lang="scss" scoped>
#top{
  margin-top: -40px;
  margin-left: 50px;
  width: 300px;
  height: 300px;
  position: absolute;
}

.lin_grad {
  width: 400px;
  height: 400px;            
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(#06203F,white);
  border-radius: 32px;
  box-shadow: 0px 5px 10px 0px;
}

#position{
  margin-top: 20px;
  color: #D4A923;
  font-size: 20px;
  font-weight: bold;
}

.title{
  @apply text-primary mb-7 font-bold text-3xl;
}

.welcome {
  @apply text-primary-dark-90 text-sm leading-7 lg:text-lg text-justify lg:leading-8 px-6;
}

ul {
  @apply list-disc mt-3;

  li {
    @apply ml-6 pb-5 text-start leading-7 text-primary lg:leading-[30px];
  }
}

.line{
  margin: auto;
  padding-top: 50px;
}

.ccs{
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 50px;
  
  @apply text-primary;
}

.background {
  height: 500px;
  background-image: url("~/assets/img/background.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .layer {
    @apply absolute top-0 left-0 w-full h-full bg-primary/90;
  }
}

.slides {
  @apply pointer-events-none;
  background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 75%, theme("colors.primary-light-90"));
}

.officers {
  @apply pointer-events-none;
  background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 30%, theme("colors.primary-light-90"));
}

.officers-swiper {
  --swiper-pagination-color: theme("colors.primary");
}

swiper-slide {
  @apply flex justify-center;
}
</style>
