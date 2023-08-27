<template>
  <div class="relative">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1]">
      <div class="container mx-auto text-center pt-8 pb-5 px-6">
        <div class="flex justify-center gap-3 mb-6">
          <md-filter-chip :selected="role === 'adviser'" @click="showMessage('adviser')" label="Adviser" title="View Message" data-sal="slide-right" data-sal-repeat>
            <div slot="icon" class="rounded-full overflow-hidden">
              <img :src="Adviser" alt="Adviser" />
            </div>
          </md-filter-chip>
          <md-filter-chip :selected="role ==='dean'" @click="showMessage('dean')" label="Dean" title="View Message" data-sal="slide-right" data-sal-repeat>
            <div slot="icon" class="rounded-full overflow-hidden">
              <img :src="Dean" alt="Dean" />
            </div>
          </md-filter-chip>
        </div>
        
        <h2 class="headline-medium font-semibold text-on-surface-variant" data-sal="slide-right" data-sal-repeat>
          {{ store.isLoggedIn ? `Hello, ${store.student.first_name} ${store.student.last_name}` : "Dive into the world of Computer Science" }}
        </h2>
        <!-- data-sal="slide-right" data-sal-delay="100" data-sal-repeat -->
        <h5 v-if="!store.isLoggedIn" class="title-medium text-on-surface-variant mt-2 mb-4">
          Connect, collaborate, and Grow Together
        </h5>

        <div class="flex justify-center space-x-3" :class="{ 'mt-5': store.isLoggedIn }" data-sal="slide-right" data-sal-repeat data-sal-delay="200">
          <v-button :to="store.isLoggedIn ? '/bulletin' : '/login'" color="primary" variant="filled">
            {{ store.isLoggedIn ? 'Bulletin Board' : 'Login' }}
          </v-button>
          <v-button :to="store.isLoggedIn ? '/merch' : '/about'" color="primary" :trailing-icon="icon('arrow_forward') || ''">
            {{ store.isLoggedIn ? 'Go to merch' : 'About Us' }}
          </v-button>
        </div>
      </div>
    </div>

    <!-- Message -->
    <Transition name="slide-fade" mode="out-in">
      <div v-show="role" class="h-full">
        <swiper-container
          ref="swiper"
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
    </Transition>

    <!-- Announcements -->
    <div class="container mx-auto px-6 flex justify-center mt-8 h-full">
      <Transition name="slide-fade" mode="out-in">
        <div v-if="isLoading">
          <md-circular-progress indeterminate />
        </div>
        <div v-else-if="message.length > 0" class="text-sm text-error">
          {{ message }}
        </div>
        <div v-else class="w-full lg:w-3/4 2xl:w-3/5 3xl:w-1/2 flex flex-col gap-6">
          <AnnouncementCard
            v-for="announcement in announcements"
            :key="announcement.id"
            :data="announcement"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from "~/store";
import { icon } from "~/utils/icon";
import { register } from 'swiper/element/bundle';
import { Endpoints, makeRequest } from '~/network/request';
import sal from "sal.js";

import VButton from '~/components/VButton.vue';
import MessageCard from '~/composables/MessageCard.vue';
import AnnouncementCard from '~/composables/AnnouncementCard.vue';

import Dean from "~/assets/img/profile/Dean.jpg";
import Adviser from "~/assets/img/profile/Adviser.jpg";
import deanMessage from "~/assets/json/dean.json";
import adviserMessage from "~/assets/json/adviser.json";

import "@material/web/iconbutton/icon-button";
import "@material/web/progress/circular-progress";
import "@material/web/chips/filter-chip";

register();

const swiper = ref();
const role = ref<Role | null>('adviser');
const isShowMessage = ref(false);
const announcements = ref<AnnouncementModel[]>([]);
const isLoading = ref(true);
const message = ref("");

const store = useStore();
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

onMounted(() => {
  // Get announcements
  makeRequest<AnnouncementModel[]>("GET", Endpoints.Announcements, null, response => {
    // Hide loading
    isLoading.value = false;

    // if success
    if (response.success) {
      announcements.value = response.data;
      return;
    }

    // Otherwise, show error message
    message.value = response.message;
  });

  // Add slide change event listener to swiper
  swiper.value.addEventListener('slidechange', (event: any) => {
    if (event.detail[0].realIndex === 0) {
      role.value = "adviser";
      return;
    }

    if (event.detail[0].realIndex === 1) {
      role.value = "dean";
      return;
    }

    role.value = null;
  });

  // Initialize sal
  sal();
});

/**
 * Show message
 * @param r - Role
 */
function showMessage(r: Role) {
  isShowMessage.value = true;
  role.value = role.value === r ? null : r;

  if (r === "adviser") {
    swiper.value.swiper.slideTo(0);
  }
  
  if (r === "dean") {
    swiper.value.swiper.slideTo(1);
  }
}
</script>

<syle lang="scss" scoped>
md-circular-progress {
  --md-circular-progress-size: 48px;
  --md-circular-progress-active-indicator-width: 10;
}
</syle>