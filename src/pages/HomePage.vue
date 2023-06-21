<template>
  <div>
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-24 pb-10 2xl:pt-28 2xl:pb-20 px-4">
        <h2 class="text-3xl 2xl:text-4xl font-bold text-primary-light-90 mb-3" ref="title">
          Dive into the world of Computer Science
        </h2>
        <h5 class="text-lg 2xl:text-xl font-medium text-primary-light-60" ref="subtitle">
          Connect, collaborate, and Grow Together
        </h5>
        <div class="pt-9 space-x-3" ref="buttons">
          <v-button to="/login" color="secondary" large>
            Login
          </v-button>
          <v-button large>
            Explore
            <v-icon :path="mdiArrowRight" />
          </v-button>
        </div>
      </div>

      <!-- Wavify -->
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs></defs>
        <path ref="wavifyEl" d=""/>
      </svg>
    </div>

    <div class="bg-secondary">
      <swiper-container
        ref="message"
        effect="cards"
        keyboard-enabled="true"
        initial-slide="1"
        cards-effect-slide-shadows="false"
        class="overflow-hidden pb-10"
      >
        <swiper-slide
          v-for="message in messages"
          :key="message.name"
          class="flex justify-center"
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
import MessageCard from '~/composables/MessageCard.vue';
import ImageDean from "~/assets/img/profile/dean.jpg";
import ImagePlaceholder from "~/assets/img/profile/placeholder.jpg";
import { register } from 'swiper/element/bundle';
import { wavify } from "~/utils/wavify";

import VButton from '~/components/VButton.vue';
import VIcon from '~/components/VIcon.vue';

import { mdiArrowRight } from '@mdi/js';
import { ref, onMounted } from 'vue';
import TextPlugin from "gsap/TextPlugin";
import gsap from "gsap";

gsap.registerPlugin(TextPlugin);

register();

const template = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas inventore excepturi consequuntur veniam ad nulla hic facere laborum omnis quaerat atque incidunt voluptates ut, laudantium est autem libero rerum maiores, enim quis voluptate ab nemo. Adipisci itaque alias reprehenderit aliquid et dolorum eveniet rerum laudantium excepturi recusandae. Similique officiis modi aut corrupti alias expedita quo quis possimus corporis! Error ut necessitatibus ullam quod rerum nemo, assumenda magni impedit? Laboriosam sapiente optio at. Neque voluptates iste itaque ratione amet, sed cumque quo pariatur quos corporis quae rem debitis et tempora, ex perspiciatis! Repellendus corrupti numquam, repudiandae minima laudantium quo doloribus accusantium vel quasi hic beatae assumenda accusamus delectus earum enim possimus in! Velit quo id fugiat atque consequatur reprehenderit blanditiis est, magnam nemo ex consectetur repellat, cupiditate cumque. Repellendus ducimus facere, quam eum sequi aut magni quasi! Nesciunt minima numquam natus nobis adipisci necessitatibus exercitationem ipsa beatae, nam, officia expedita placeat!";
const messages = [
  {
    image: ImagePlaceholder,
    name: "Mr. Huebert Ferolino",
    position: "Chairperson for Computer Science",
    message: template
  },
  {
    image: ImageDean,
    name: "Mr. Neil Basabe",
    position: "Dean - UC Main CCS",
    message: template
  }
];

const wavifyEl = ref();
const title = ref();
const subtitle = ref();
const buttons = ref();
const message = ref();

onMounted(() => {
  wavify(wavifyEl.value, {
    height: 50,
    bones: 5,
    amplitude: 50,
    color: "#D4A923",
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

<style lang="scss" scoped>
.swiper-cards swiper-slide {
  @apply overflow-visible #{!important};
}
</style>
