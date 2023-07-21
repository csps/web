<template>
  <div class="relative">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-16 pb-10 2xl:pt-20 2xl:pb-8 px-6">
        <h2 class="text-2xl md:text-3xl font-bold" ref="title">
          Dive into the world of Computer Science
        </h2>
        <h5 class="text-sm md:text-base xl:text-lg font-medium text-neutral-80 dark:text-neutral-70 mt-3 mb-6" ref="subtitle">
          Connect, collaborate, and Grow Together
        </h5>
        <div class="flex justify-center space-x-3" ref="buttons">
          <v-button to="/login" :color="store.isDark ? 'primary' : 'secondary'" variant="filled">
            Login
          </v-button>
          <v-button to="/about" :color="store.isDark ? 'primary' : 'secondary'" :trailing-icon="mdiArrowRight">
            Explore
          </v-button>
        </div>
      </div>
      <div class="w-full overflow-hidden">
        <canvas ref="waveEl"></canvas>
      </div>
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
import { useStore } from "~/store";
import { mdiArrowRight } from '@mdi/js';
import { ref, onMounted, watch } from 'vue';
import wave from "~/utils/wave";

import VButton from '~/components/VButton.vue';
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
const waveEl = ref();
const title = ref();
const subtitle = ref();
const buttons = ref();
const message = ref();

let wavifyInstance: {
  setColor: (color: string) => void;
};

watch(() => store.isDark, v => {
  if (!wavifyInstance) return;
  wavifyInstance.setColor(v ? "#4c444d" : "#D4A923");
})

onMounted(() => {
  wavifyInstance = wave(waveEl.value, store.isDark ? "#4c444d" : "#D4A923");
});
</script>

