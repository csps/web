<template>
  <div class="bg-primary h-[40vh] rounded-br-3xl rounded-bl-3xl">
    <!-- App Bar -->
    <v-app-bar />

    <swiper-container
      effect="cards"
      keyboard-enabled="true"
      cards-effect-slide-shadows="false"
    >
      <swiper-slide
        v-for="message in messages"
        :key="message.name"
        class="flex justify-center overflow-hidden"
      >
        <MessageCard
          class="mx-4"
          :image="message.image"
          :name="message.name"
          :position="message.position"
          :message="message.message"
        />  
      </swiper-slide>
    </swiper-container>
    <div class="flex justify-center">
    </div>
  </div>
</template>

<script lang="ts" setup>
import VAppBar from '~/components/VAppBar.vue';
import MessageCard from '~/composables/MessageCard.vue';
import ImageDean from "~/assets/img/profile/dean.jpg";
import ImagePlaceholder from "~/assets/img/profile/placeholder.jpg";
import { register } from 'swiper/element/bundle';

register();

const template = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas inventore excepturi consequuntur veniam ad nulla hic facere laborum omnis quaerat atque incidunt voluptates ut, laudantium est autem libero rerum maiores, enim quis voluptate ab nemo. Adipisci itaque alias reprehenderit aliquid et dolorum eveniet rerum laudantium excepturi recusandae. Similique officiis modi aut corrupti alias expedita quo quis possimus corporis! Error ut necessitatibus ullam quod rerum nemo, assumenda magni impedit? Laboriosam sapiente optio at. Neque voluptates iste itaque ratione amet, sed cumque quo pariatur quos corporis quae rem debitis et tempora, ex perspiciatis! Repellendus corrupti numquam, repudiandae minima laudantium quo doloribus accusantium vel quasi hic beatae assumenda accusamus delectus earum enim possimus in! Velit quo id fugiat atque consequatur reprehenderit blanditiis est, magnam nemo ex consectetur repellat, cupiditate cumque. Repellendus ducimus facere, quam eum sequi aut magni quasi! Nesciunt minima numquam natus nobis adipisci necessitatibus exercitationem ipsa beatae, nam, officia expedita placeat!";
const messages = [
  {
    image: ImageDean,
    name: "Mr. Neil Basabe",
    position: "Dean - UC Main CCS",
    message: template
  },
  {
    image: ImagePlaceholder,
    name: "Mr. Huebert Ferolino",
    position: "Adviser / Chairman",
    message: template
  },
  {
    image: ImagePlaceholder,
    name: "Mr. Franz Josef Caminade",
    position: "Assistant Chairman",
    message: template
  },
];
</script>

<style lang="scss">
:root {
  @apply bg-secondary;
}
</style>
