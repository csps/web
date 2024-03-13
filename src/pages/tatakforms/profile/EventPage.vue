<template>
  <div class="container px-7 mx-auto flex flex-col gap-3">
    <div class="text-center mb-5">
        <h2 class="mb-1 text-2xl font-bold text-primary">UC Days 2024</h2>
        <h5>
            April 11,2024 to
            April 13,2024
        </h5>
        <div class="flex justify-center gap-2">
            <md-filled-button class="mt-3">Download Tatak Form</md-filled-button>
            <md-filled-button class="mt-3">Generate QR Code</md-filled-button>
        </div>
    </div>

    <!-- <div>
        <p class="title-medium font-semibold text-primary mb-2">Your QR Code</p>
    </div> -->

    <div class="mt-5 lg:flex justify-center lg:gap-5 lg:justify-center">
        <h5 class="title-medium font-semibold text-primary mb-2 ">Your Activity</h5>
        <section class="">
            <div>
                <p class="font-semibold">UC DAYS 2024 - ATTENDANCE</p>
                <p class="text-outline text-xs lg:text-sm">April 11, 2024 at 10:00am</p>
            </div>
            <md-divider inset-end class="my-3"></md-divider>
            <div>
                <p class="font-semibold">UC DAYS 2024 - ATTENDANCE</p>
                <p class="text-outline text-xs lg:text-sm">April 11, 2024 at 1:00pm</p>
            </div>
        </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { isEmail } from '~/utils/string';
import { Endpoints, makeRequest } from '~/network/request';
import { mapYearLevel } from '~/utils/page';
import { useStore, useDialog } from '~/store';
import { icon } from '~/utils/icon';
import sal from "sal.js";
import dayjs from "dayjs";

import "@material/web/textfield/filled-text-field";
import "@material/web/button/text-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/filled-button";
import "@material/web/select/filled-select";
import "@material/web/select/select-option";
import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

import cas from "~/assets/img/tatakform/colleges/cas.png";

const store = useStore();
const route = useRoute();

const errorMessage = ref("");

onMounted(() => {
  console.log(route.user)
});


</script>


<style lang="scss" scoped>
.event {
  @apply flex flex-col justify-between relative bg-surface-container-low rounded-xl;
  animation: glow 1.5s ease-in-out infinite alternate;

  .foreground {
    @apply bg-surface-container-high rounded-xl;
  }

  .content {
    @apply font-medium rounded-2xl min-w-80;
  }
}
</style>