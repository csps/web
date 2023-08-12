<template>
  <div class="relative">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-16 pb-10 2xl:pt-20 2xl:pb-12 px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-on-surface-variant" data-sal="zoom-in" data-sal-repeat>
          {{ store.isLoggedIn ? `Hello, ${store.student.first_name} ${store.student.last_name}` : "Dive into the world of Computer Science" }}
        </h2>
        <h5 v-if="!store.isLoggedIn" class="text-sm md:text-base xl:text-lg text-on-surface-variant mt-3 mb-6" data-sal="zoom-in" data-sal-delay="100" data-sal-repeat>
          Connect, collaborate, and Grow Together
        </h5>
        <div class="flex justify-center space-x-3" :class="{ 'mt-5': store.isLoggedIn }" data-sal="zoom-in" data-sal-repeat data-sal-delay="200">
          <v-button :to="store.isLoggedIn ? '/bulletin' : '/login'" color="primary" variant="filled">
            {{ store.isLoggedIn ? 'Bulletin Board' : 'Login' }}
          </v-button>
          <v-button :to="store.isLoggedIn ? '/shop' : '/about'" color="primary" :trailing-icon="icon('arrow_forward') || ''">
            {{ store.isLoggedIn ? 'Go to shop' : 'About Us' }}
          </v-button>
        </div>
      </div>
    </div>

    <div class="bg-surface pb-24 overflow-x-hidden flex-grow">
      <swiper-container
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
import { onMounted } from 'vue';
import { icon } from "~/utils/icon";
import sal from "sal.js";

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
    name: "Mr. Heubert Ferolino",
    position: "Adviser",
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
onMounted(sal);
</script>
