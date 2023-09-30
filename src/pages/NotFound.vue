<template>
  <div class="flex flex-col justify-center items-center px-6 gap-1">
    <img width="75" :src="CSPS" alt="CSPS Logo" data-sal="zoom-in" />
    <h3 class="title-large font-bold text-on-surface-variant mt-2" data-sal="zoom-in" data-sal-delay="100">Page not found</h3>
    <p class="text-on-surface-variant" data-sal="zoom-in" data-sal-delay="200">The page you are looking for doesn't exist. Here are some helpful links:</p>

    <div class="flex gap-2 mt-5">
      <md-filled-tonal-button @click="router.back()" data-sal="zoom-in" data-sal-delay="300">
        <md-icon slot="icon" v-html="icon('arrow_back')" />
        Go back
      </md-filled-tonal-button>
      <router-link to="/" data-sal="zoom-in" data-sal-delay="300">
        <md-filled-button>
          Take me to homepage
        </md-filled-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";

import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { icon } from "~/utils/icon";

import CSPS from "~/assets/img/csps_logo.png";
import sal from "sal.js";

const router = useRouter();

onMounted(sal);;
</script>