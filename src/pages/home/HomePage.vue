<template>
  <div class="relative">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-8 pb-10 2xl:pb-12 px-6">

        <div class="flex justify-center gap-3 mb-6">
          <md-assist-chip label="Adviser" v-tippy="'View message'">
            <div slot="icon" class="rounded-full overflow-hidden">
              <img :src="Adviser" alt="Adviser's message" />
            </div>
          </md-assist-chip>
          <md-assist-chip label="Dean" v-tippy="'View message'">
            <img slot="icon" class="rounded-full" :src="Dean" alt="Dean's message" />
          </md-assist-chip>
        </div>
        
        <h2 class="text-2xl md:text-3xl font-bold text-on-surface-variant" data-sal="zoom-in" data-sal-repeat>
          {{ store.isLoggedIn ? `Hello, ${store.student.first_name} ${store.student.last_name}` : "Dive into the world of Computer Science" }}
        </h2>

        <h5 v-if="!store.isLoggedIn" class="text-sm md:text-base xl:text-lg text-on-surface-variant my-5" data-sal="zoom-in" data-sal-delay="100" data-sal-repeat>
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
  </div>
</template>

<script lang="ts" setup>
import { register } from 'swiper/element/bundle';
import { useStore } from "~/store";
import { onMounted } from 'vue';
import { icon } from "~/utils/icon";
import sal from "sal.js";

import VButton from '~/components/VButton.vue';

import Dean from "~/assets/img/profile/Dean.jpg";
import Adviser from "~/assets/img/profile/Adviser.jpg";

// import deanMessage from "~/assets/json/dean.json";
// import adviserMessage from "~/assets/json/adviser.json";

import "@material/web/iconbutton/icon-button";
import "@material/web/chips/assist-chip";

register();

// const messages = [
//   {
//     image: Adviser,
//     name: "Mr. Heubert Ferolino",
//     position: "Adviser",
//     message: adviserMessage
//   },
//   {
//     image: Dean,
//     name: "Mr. Neil Basabe",
//     position: "Dean - UC Main CCS",
//     message: deanMessage
//   },
// ];

const store = useStore();
onMounted(sal);
</script>
