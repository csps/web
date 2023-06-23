<template>
  <div class="h-full bg-primary-light-90">
    <div class="relative -translate-y-20 w-full">
      <div class="relative w-full background">
        <div class="layer" />
      </div>
      <div class="absolute flex flex-col justify-center items-center top-0 w-full h-full pb-5">
        <img ref="headerImg" width="200" :src="CSPSLogo" alt="CSPS Logo" />
        <h4 ref="headerTitle" class="mt-10 text-3xl font-bold text-primary-light-90 text-center">
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
          <div class="grid gap-10 grid-cols-2">
            <div>
              <h1 id="title" ref="s1Title">Why CSP-S?</h1>
              <p id="welcome" ref="s1Subtitle">
                Welcome to the  Computing Science of the Philippines - Students (CSP-S)! We are a student body organization that aims to create a welcoming and inclusive community for all computer science students at the University of Cebu - Main Campus. Our goal is to promote inclusivity and diversity within the field of computing, ensuring that every student has the opportunity to explore their interests and succeed in their academic and professional pursuits.
                Join us at CSP-S and become part of a community that celebrates diversity and fosters growth and development for all students in the field of computer science. We welcome you with open arms!
              </p>
            </div>
            <img ref="s1Image" class="shadow-primary-light-70 shadow-lg rounded-[32px]" id="csps" :src="Image" />
          </div>
        </div>
        <div class="introduction">
          <div class="grid gap-10 grid-cols-3">
          <img style="margin-top: 75px;" :src="TopLeft"/>
          <img class="line" :src="CLine"/>
          <img style="margin-top: 73px; margin-left: 10px;" :src="TopRight"/>
          </div>
          <h1 class="ccs" style="text-align: center;">College of Computer Studies</h1>
        </div>
        <div id="state">
          <div class="mission">
            <h4 class="tile">Mission</h4>
            <p class="missions">We envision being the hub of quality, globally-competitive and socially-responsive information technology education</p>
          </div>
          <div class="mission">
            <h4 class="tile">Vision</h4>
            <p class="text">We commit to continuously:</p>
            <ul class="unorder">
              <li style="margin-bottom: 10px;">Offer relevant programs that mold well-rounded computing professionals;</li>
              <li style="margin-bottom: 10px;">Engage in accreditation and quality standards; and </li>
              <li style="margin-bottom: 10px;">Facilitate in building an IT-enabled nation.</li>
            </ul>
          </div>
          <div class="mission">
            <h4 class="tile">Goals</h4>
            <p class="text">We aim to cultivate a teaching-learning environment that:</p>
            <ul class="unorder">
              <li style="margin-bottom: 10px;">Promotes scholarly endeavors for the promotion of moral,social, cultural, and environmental interests;</li>
              <li style="margin-bottom: 10px;">Meets the demands of the industry in terms of technical,personal and interpersonal skills; Conducts intellectual, technological and significant researches in computing; and Optimizes the use of appropriate and advanced resources and services.</li>
            </ul>
          </div>
          <div class="mission">
            <h4 class="tile">Core Values</h4>
            <p class="text">These are the core values that CCS believes in:</p>
            <ul class="unorder">
              <li style="margin-bottom: 10px;">Initiative (inceptum) wit, practicality, ingenuity</li>
              <li style="margin-bottom: 10px;">Innovation (innovatio) technology, creativity, novelty</li>
              <li style="margin-bottom: 10px;">Service (muneris) industry, loyalty, courtesy</li>
            </ul>
          </div>
        </div>
        <div class="introduction">
          <div class="grid gap-10 grid-cols-3">
          <img style="margin-top: 100px;" :src="BottomLeft"/>
          <img class="line" :src="ULine"/> 
          <img style="margin-top: 100px; margin-left: 10px;" :src="BottomRight"/>
          </div>
          <h1 class="ccs" style="text-align: center;">University of Cebu</h1>
          <div id="mv" style="padding-bottom: 150px;">
            <div class="grid gap-10 grid-cols-2">
            <div class="ms" style="margin-right: 90px;">
              <h4 class="tile">Mission</h4>
              <p class="missions">The University offers affordable and quality education responsive to the demands of local and international communities.</p>
            </div>
            <div class="ms" style="margin-left: 90px;">
              <h4 class="tile">Vision</h4>
              <p class="missions" >Democratize quality education.Be the visionary and industry leader.Give hope and transform lives.</p>
            </div>
            </div>
          </div>
        </div>
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
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Image from '~/assets/img/csps.png';
import CSPSLogo from '~/assets/img/csps_logo.png';
import CLine from "~/assets/img/ccs_line.png";
import ULine from "~/assets/img/uc_line.png";
import Jewel from "~/assets/img/jewel.png";
import Dev from "~/assets/img/dev_line.png";
import TopLeft from "~/assets/border/top_left.png";
import TopRight from "~/assets/border/top_right.png";
import BottomLeft from "~/assets/border/bottom_left.png";
import BottomRight from "~/assets/border/bottom_right.png";

import { ref, onMounted } from 'vue';
import { wavify } from '~/utils/wavify';
import gsap from 'gsap';

const headerImg = ref();
const headerTitle = ref();
const s1Title = ref();
const s1Subtitle = ref();
const s1Image = ref();
const wavifyEl = ref();

onMounted(() => {
  wavify(wavifyEl.value, {
    height: 50,
    bones: 6,
    amplitude: 30,
    color: "rgb(237, 233, 238)",
    speed: .25,
  });

  gsap.fromTo([headerImg.value, headerTitle.value, s1Title.value, s1Subtitle.value, s1Image.value],
    {
      x: -100,
      opacity: 0,
    },
    {
      duration: 0.5,
      x: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out",
    }
  );
});
</script>

<style lang="scss" scoped>
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
.missions{
  text-align: center;
  padding: 20px;
}
.ms{
  background-color: #4A2558;
  border: #D4A923;
  width: 550px;
  color: white;
  border-radius: 20px;
  height: 220px;
}
#title{
  font-size: 40px;
  font-weight: bold;

  @apply text-primary-dark-80 mb-7;
}

#welcome{
  @apply text-primary-dark-90 text-xl text-justify leading-8;
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
  color: #06203F;
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
</style>