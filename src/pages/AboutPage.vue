<template>
  <div class="h-full bg-primary-light-90">
    <div class="relative -translate-y-20 w-full">
      <div class="relative w-full background">
        <div class="layer" />
      </div>
      <div class="absolute flex flex-col justify-center items-center top-0 w-full h-full pb-5">
        <img class="anim-1" width="200" :src="CSPSLogo" alt="CSPS Logo" />
        <h4 class="anim-2 mt-10 text-2xl lg:text-3xl font-bold text-primary-light-90 text-center">
          Computing Society of the Philippines - Students
        </h4>
        <svg class="absolute -bottom-1 z-10" height="100" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs></defs>
          <path ref="wavifyEl" d=""/>
        </svg>
      </div>
    </div>

    <div class="-translate-y-20">
      <div class="container mx-auto pt-10">
        <div class="introduction">
          <div class="grid gap-10 grid-cols-1 lg:grid-cols-2">
            <div class="flex items-center flex-col justify-center">
              <h1 id="title" class="text-center lg:text-left w-full anim-3">Why CSP-S?</h1>
              <p id="welcome" class="anim-4">
                Welcome to the  Computing Society of the Philippines - Students (CSP-S)! We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus. Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits.
                Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!
              </p>
            </div>
            <img class="anim-5 shadow-primary-light-70 shadow-lg rounded-[32px]" id="csps" :src="Image" />
          </div>
        </div>
        
        <div class="flex flex-col items-center justify-center mb-16 mt-24">
          <img class="anim-6 w-32 mb-5" :src="CCSLogo" alt="CCS Logo" />
          <h1 class="anim-7 text-2xl font-bold text-primary" style="text-align: center;">College of Computer Studies</h1>
        </div>
      </div>

      <GeometryShapes />

      <div class="flex justify-center relative ">
        <div class="absolute top-0 left-0 right-0 bottom-0 ccs-info h-full w-full z-[500]" />
        <swiper-container
          class="py-16"
          effect="coverflow"
          slides-per-view="3"
          centered-slides="true"
          coverflow-effect-slide-shadows="false"
          autoplay-delay="3000"
        >
          <swiper-slide>
            <CardAbout class="w-1/2 lg:w-full" title="Mission">
              We envision being the hub of quality, globally-competitive and socially-responsive information technology education.
            </CardAbout>
          </swiper-slide>
          <swiper-slide>
            <CardAbout class="w-1/2 lg:w-full" title="Vision">
              <p class="mb-5">We commit to continuously:</p>
              <ul>
                <li>Offer relevant programs that mold well-rounded computing professionals;</li>
                <li>Engage in accreditation and quality standards; and </li>
                <li>Facilitate in building an IT-enabled nation.</li>
              </ul>
            </CardAbout>
          </swiper-slide>
          <swiper-slide>
            <CardAbout class="w-1/2 lg:w-full" title="Goals">
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
          <swiper-slide>
            <CardAbout class="w-1/2 lg:w-full" title="Core Values">
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
          <img class="anim-6 w-32 mb-5" :src="UCLogo" alt="UC Logo" />
          <h1 class="anim-7 text-2xl font-bold text-tertiary" style="text-align: center;">University of Cebu</h1>
        </div>
      </div>

      <GeometryShapes />

      <div class="flex flex-col items-center justify-center">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-[50px] xl:gap-[100px] w-1/2 mt-16 justify-items-center">
          <CardAbout class="w-full" title="Mission">
            The University offers affordable and quality education responsive to the demands of local and international communities.
          </CardAbout>
  
          <CardAbout class="w-full" title="Vision">
            Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
          </CardAbout>
        </div>
      </div>

        <!-- 
        <div style="border: 10px; position: absolute; right: 0; left: 0; color: #4A2558; background-color: #4A2558;">a</div>
        <div style="border: 10px; position: absolute;margin-top: 20px; right: 0; left: 0; color: #D4A923; background-color: #D4A923;">a</div>
        <div class="introduction" >
          <h1 id="title" style="padding-bottom: 50px; padding-top: 100px;" class="text-center">
            MEET THE 
            <font color="#D4A923">CSPS OFFICERS</font>
          </h1>
          <div id="stack_image">
            <div id="lin_grad">
            </div>
            <div id="top">
              <img :src="Jewel"/>
              <h3 id="position" style="text-align: center; font-size: 25px;">President</h3>
              <p id="position" style="color: #06203F; margin-top: 4px; font-size: 25px; font-weight: bold; text-align: center;">Jewel Cedrick Gesim</p>
          </div>
        </div>
      </div>
      <div class="introduction">
        <img class="line" :src="Dev"/>
        <h1 class="ccs" style="text-align: center;">Developers Message</h1>
        <div id="dev_message" style="background-color: #4A2558; color:white; font-size: 20px; text-align: center; border-radius: 20px; padding: 50px;  ">Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Image from '~/assets/img/csps.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import CCSLogo from '~/assets/img/ccs_logo.png';
import UCLogo from '~/assets/img/uc_logo.png';

import { ref, onMounted } from 'vue';
import { wavify } from '~/utils/wavify';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';

import GeometryShapes from '~/composables/GeometryShapes.vue';
import CardAbout from '~/composables/CardAbout.vue';

const wavifyEl = ref();

register();

onMounted(() => {
  wavify(wavifyEl.value, {
    height: 50,
    bones: 6,
    amplitude: 30,
    color: "rgb(237, 233, 238)",
    speed: .25,
  });

  const swiperEl: SwiperContainer | null = document.querySelector('swiper-container');
  if (swiperEl === null) return;

  Object.assign(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 100,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  swiperEl.initialize();
});
</script>

.<style lang="scss" scoped>
.introduction{
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 35px;
}

#stack_image{
  width: 100px;
  height: 200px;
  position: relative;
  margin-left: 540px;
  margin-bottom: 200px;
  margin-top: 40px;
}
#top{
  margin-top: -40px;
  margin-left: 50px;
  width: 300px;
  height: 300px;
  position: absolute;
}
#lin_grad{
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

#title{
  @apply text-primary mb-7 font-bold text-3xl;
}

#welcome{
  @apply text-primary-dark-90 text-lg text-justify leading-8;
}

.unorder{
  margin: auto;
  padding-left: 20px;
  list-style-position: inside;
  list-style-type: circle;
  padding-top: 20px;
  padding-right: 20px;
}
#state{
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  height: 100%;
  gap: 5rem;
  padding-left: 50px;
  padding-bottom: 50px;
}

ul {
  @apply list-disc mt-3;

  li {
    @apply ml-6 pb-5 text-start text-primary leading-[30px];
  }
}

#mv{
  height: 100%;
  width: fit-content;
  margin: auto;
}
.mission{
  background-color: #06203F;
  width: fit-content;
  max-width: 350px;
  color: white;
  border-radius: 20px;
  height: 490px;

}
.tile{
  color: #D4A923;
  text-align: center;
  font-weight: bold;
  padding-top: 30px;
  font-size: 20px;
}
.text{
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
#join{
  font-size: 20px;
  margin-left: 400px;
  margin-right: 400px;
  padding-bottom: 50px;
}
#csps{
  margin: auto;
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

.ccs-info {
  @apply pointer-events-none;
  background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 50%, theme("colors.primary-light-90"));
}

swiper-slide {
  @apply flex justify-center;
}
</style>
