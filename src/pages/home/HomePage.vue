<template>
  <div class="bg-surface-variant dark:bg-surface-container-high flex-grow relative h-full -z-[1]">
    <!-- Call To Action -->
    <div class="rounded-br-3xl rounded-bl-3xl -z-[1] bg-surface pt-20 -translate-y-20">
      <div class="container mx-auto text-center pt-8 pb-5 px-6">
        <div class="flex justify-center gap-3 mb-6" data-sal="zoom-in">
          <md-filter-chip :selected="role ==='dean'" @click="showMessage('dean')" label="Dean" title="Welcome Message" elevated>
            <div slot="icon" class="rounded-full overflow-hidden">
              <img :src="Dean" alt="Dean" />
            </div>
          </md-filter-chip>
          <md-filter-chip :selected="role === 'adviser'" @click="showMessage('adviser')" label="Adviser" title="Welcome Message" elevated>
            <div slot="icon" class="rounded-full overflow-hidden">
              <img :src="Adviser" alt="Adviser" />
            </div>
          </md-filter-chip>
        </div>

        <h2 class="headline-medium font-semibold text-on-surface-variant" data-sal="zoom-in">
          {{ store.isLoggedIn ? `Hello, ${store.user.first_name} ${store.user.last_name}` : "Dive into the world of Computer Science" }}
        </h2>

        <h5 v-if="!store.isLoggedIn" class="title-medium text-on-surface-variant mt-2 mb-4" data-sal="zoom-in">
          Connect, collaborate, and Grow Together
        </h5>

        <div class="flex justify-center space-x-3" :class="{ 'mt-5': store.isLoggedIn }">
          <v-button :to="store.isLoggedIn ? '/bulletin' : '/login'" color="primary" variant="filled" data-sal="slide-left">
            {{ store.isLoggedIn ? 'Bulletin Board' : 'Login' }}
          </v-button>
          <v-button :to="store.isLoggedIn ? '/merch' : '/about'" color="primary" :trailing-icon="icon('arrow_forward') || ''" data-sal="slide-right">
            {{ store.isLoggedIn ? 'Go to merch' : 'About Us' }}
          </v-button>
        </div>
      </div>
      <div class="w-full overflow-hidden mt-10">
        <canvas ref="waveEl"></canvas>
      </div>
    </div>

    <!-- Message -->
    <Transition name="slide-fade" mode="out-in">
      <div v-if="role && role !== '-' as Role" class="h-full bg-surface-variant dark:bg-surface-container-high px-6 mt-16 mb-16">
        <swiper-container
          id="swiper"
          effect="cards"
          keyboard-enabled="true"
          round-lengths="true"
          class="overflow-visible w-full md:w-3/4 lg:w-4/5 xl:w-2/3 2xl:w-3/4 3xl:w-2/3"
          grab-cursor="true"
        >
          <swiper-slide
            v-for="message in messages"
            :key="message.name"
            class="overflow-hidden rounded-[28px]"
          >
            <CardMessage
              :image="message.image"
              :name="message.name"
              :position="message.position"
              :message="message.message"
              :role="message.role"
              :active-role="role"
            />  
          </swiper-slide>
        </swiper-container>
      </div>
    </Transition>

    <!-- Announcements -->
    <div class="container mx-auto px-6 flex justify-center mt-16 h-full">
      <div v-if="isLoading" class="flex flex-col justify-center items-center gap-2 body-medium">
        <md-linear-progress indeterminate />
        <span>Fetching announcements...</span>
      </div>
      <div v-else-if="message.length > 0" class="text-sm p-8 bg-surface rounded-3xl text-on-surface">
        {{ message }}
      </div>
      <div v-else class="w-full lg:w-3/4 2xl:w-3/5 3xl:w-1/2 flex flex-col gap-6 pb-6">
        <CardAnnouncement
          v-for="announcement in announcements"
          :key="announcement.id"
          :data="announcement"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Swiper from 'swiper';
import { ref, onMounted, watch } from 'vue';
import { useStore } from "~/store";
import { icon } from "~/utils/icon";
import { register } from 'swiper/element/bundle';
import { Endpoints, makeRequest } from '~/network/request';
import { AnnouncementEnum } from '~/types/models';
import { getStore, setStore } from '~/utils/storage';
import { PaginationRequest } from '~/types/request';
import { createPagination } from '~/utils/pagination';
import wave from "~/utils/wave";
import sal from "sal.js";

import VButton from '~/components/VButton.vue';
import CardMessage from '~/composables/CardMessage.vue';
import CardAnnouncement from '~/composables/CardAnnouncement.vue';

import Dean from "~/assets/img/profile/Dean.jpg";
import Adviser from "~/assets/img/profile/Adviser.jpg";
import deanMessage from "~/assets/messages/dean.txt?raw";
import adviserMessage from "~/assets/messages/adviser.txt?raw";

import "@material/web/iconbutton/icon-button";
import "@material/web/progress/linear-progress";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/chips/filter-chip";

register();

const waveEl = ref();
const role = ref<Role | null>(getStore("home_msg_role") as Role || null);
const isShowMessage = ref(false);
const announcements = ref<AnnouncementModel[]>([]);
const isLoading = ref(true);
const message = ref("");

const store = useStore();
const messages = [
  {
    image: Dean,
    name: "Mr. Neil Basabe",
    position: "Dean - UC Main CCS",
    message: deanMessage,
    role: "dean"
  },
  {
    image: Adviser,
    name: "Mr. Heubert Ferolino",
    position: "Adviser",
    message: adviserMessage,
    role: "adviser"
  },
];

let wavifyInstance: {
  setColor: (color: string) => void;
};

watch(() => store.isDark, v => {
  if (!wavifyInstance) return;
  wavifyInstance.setColor(v ? "#2C292C" : "#EBDFE9");
});

onMounted(() => {
  const request = createPagination({
    sort: {
      key: AnnouncementEnum.date_stamp,
      type: "DESC"
    }
  });

  // Get announcements
  makeRequest<AnnouncementModel[], PaginationRequest>("GET", Endpoints.Announcements, request, response => {
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

  // Get swiper
  const swiper = getSwiper();

  if (role.value === 'dean') {
    swiper?.slideTo(0);
  }

  if (role.value === 'adviser') {
    swiper?.slideTo(1);
  }

  // Bind swiper
  bindSwiper();
  // Initialize wavify
  wavifyInstance = wave(waveEl.value, store.isDark ? "#2C292C" : "#EBDFE9");
  // Initialize sal
  sal();
});

/**
 * Get swiper
 */
function getSwiper(returnEl = false): Swiper | null {
  const el = document.getElementById("swiper") as any;
  if (el === null) return null;
  return returnEl ? el : el.swiper;
}

/**
 * Show message
 * @param r - Role
 */
function showMessage(r: Role) {
  isShowMessage.value = true;
  role.value = role.value === r ? null : r;

  setTimeout(() => {
    // Get swiper
    const swiper = bindSwiper();

    if (role.value === "dean") {
      swiper?.slideTo(0);
      return;
    }
    
    if (role.value === "adviser") {
      swiper?.slideTo(1);
      return;
    }

    setStore("home_msg_role", "-");
  }, 0);
}

/**
 * Bind swiper
 */
function bindSwiper() {
  // Get swiper
  const swiper = getSwiper(true);
  // If swiper is null, return
  if (swiper === null) return;

  // Add slide change event listener to swiper
  (swiper as any).addEventListener('slidechange', (event: any) => {
    if (event.detail[0].realIndex === 0) {
      role.value = "dean";
      setStore("home_msg_role", "dean");
      return;
    }
    
    if (event.detail[0].realIndex === 1) {
      role.value = "adviser";
      setStore("home_msg_role", "adviser");
      return;
    }

    setStore("home_msg_role", "-");
    role.value = null;
  });

  return (swiper as any).swiper;
}
</script>

<style lang="scss" scoped>
md-circular-progress {
  --md-circular-progress-size: 48px;
  --md-circular-progress-active-indicator-width: 10;
}
</style>