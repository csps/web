<template>
  <div class="relative">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-16 pb-10 2xl:pt-28 2xl:pb-20 px-4">
        <h2 class="text-3xl 2xl:text-4xl font-bold mb-3 dark:text-primary-90" ref="title">
          Dive into the world of Computer Science
        </h2>
        <h5 class="text-base 2xl:text-xl font-medium text-neutral-80 dark:text-neutral-70" ref="subtitle">
          Connect, collaborate, and Grow Together
        </h5>
        <div class="pt-9 space-x-3" ref="buttons">
          <v-button to="/login" color="secondary" large>
            Login
          </v-button>
          <v-button to="/about" large>
            Explore
            <v-icon :path="mdiArrowRight" />
          </v-button>
        </div>
      </div>

      <!-- Wavify -->
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs></defs>
        <path ref="wavifyEl" d="" />
      </svg>
    </div>

    <div class="bg-csps-secondary dark:bg-surface-variant pb-24 -translate-y-1 overflow-x-hidden">
      <swiper-container
        ref="message"
        effect="coverflow"
        keyboard-enabled="true"
        round-lengths="true"
        class="overflow-visible"
        coverflow-effect-slide-shadows="false"
        grab-cursor="true"
      >
        <swiper-slide
          v-for="message in messages"
          :key="message.name"
          class="flex pt-28 pb-10 justify-center overflow-visible"
        >
          <MessageCard
            :image="message.image"
            :name="message.name"
            :position="message.position"
            :message="message.message"
          />  
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { register } from 'swiper/element/bundle';
import { wavify } from "~/utils/wavify";
import { useStore } from "~/store";
import { mdiArrowRight } from '@mdi/js';
import { ref, onMounted, watch } from 'vue';
import gsap from "gsap";

import VButton from '~/components/VButton.vue';
import VIcon from '~/components/VIcon.vue';
import MessageCard from '~/composables/MessageCard.vue';

import Dean from "~/assets/img/profile/Dean.jpg";
import Adviser from "~/assets/img/profile/Adviser.jpg";

import deanMessage from "~/assets/json/dean.json";
import adviserMessage from "~/assets/json/adviser.json";

register();

const messages = [
  {
    image: Adviser,
    name: "Mr. Huebert Ferolino",
    position: "Adviser / Chairperson for Computer Science",
    message: adviserMessage
  },
  {
    image: Dean,
    name: "Mr. Neil Basabe",
    position: "Dean - UC Main CCS",
    message: deanMessage
  },
];

const store = useStore();
const wavifyEl = ref();
const title = ref();
const subtitle = ref();
const buttons = ref();
const message = ref();

let wavifyInstance: Wavify;

watch(() => store.isDark, v => {
  if (!wavifyInstance) return;
  wavifyInstance.updateColor({
    color: v ? "#4c444d" : "#D4A923"
  });
})

onMounted(() => {
  wavifyInstance = wavify(wavifyEl.value, {
    height: 50,
    bones: 5,
    amplitude: 50,
    color: store.isDark ? "#4c444d" : "#D4A923",
    speed: .25,
  });

  gsap.fromTo([title.value, subtitle.value, buttons.value, message.value],
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
