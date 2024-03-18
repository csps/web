<template>
  <div class="container px-7 mx-auto flex flex-col gap-3">
  <div v-if="isLoading" class="flex flex-col justify-center items-center gap-5 h-full">
        <md-linear-progress indeterminate />
        <p>Fetching Event...</p>
  </div>
    <div class="text-center mb-5" v-else>
        <h2 class="mb-1 text-2xl font-bold text-primary">{{event.name}}</h2>
        <h5>
            {{getHumanDate(new Date(event.from_date))}} to
            {{getHumanDate(new Date(event.to_date))}}
        </h5>
        <div class="md:flex justify-center gap-2">
            <md-filled-button class="mt-3" @click="generateQrCode">Generate QR Code</md-filled-button>
            <md-filled-button class="mt-3">Download Tatak Form</md-filled-button>
        </div>
    </div>

    <!-- <div>
        <p class="title-medium font-semibold text-primary mb-2">Your QR Code</p>
    </div> -->

    <div class="mt-5 lg:flex justify-center lg:gap-5 lg:justify-center">
        <h5 class="title-medium font-semibold text-primary mb-2 ">Your Activity</h5>
        <section class="">
            <div v-for="history in attendanceHistory">
                <p class="font-semibold">UC DAYS 2024 - ATTENDANCE</p>
                <p class="text-outline text-xs lg:text-sm">{{getReadableDate(history)}}</p>
                <md-divider inset-end class="my-3"></md-divider>
            </div>
        </section>
    </div>
    <div class="text-center" v-if="attendanceHistory.length === 0">
    <p>No attendance yet</p>
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
import { Config } from "~/config";
import { getReadableDate,getHumanDate } from "~/utils/date";
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
const isLoading = ref(true);

const store = useStore();
const route = useRoute();
const dialog = useDialog();

const errorMessage = ref("");


const attendanceHistory = ref([])
const event = ref<TatakformModel>()
onMounted(() => {
  makeRequest<any, { acronym: string }>("GET", Endpoints.TatakformsAttendanceHistoryOfEvent, { slug: route.params.slug as string }, response => {
    
    if (response.success) {
      if(response.data[1] > 0){
        const dataObj = response.data[0][0]
        Object.keys(dataObj).forEach(key => {
          if(dataObj[key]){
            const data = dataObj[key].toString().split(" ")
            if(data.length > 1){
              attendanceHistory.value.push(dataObj[key])
            }
          }
        })
      }
      
    makeRequest<TatakformModel, { acronym: string }>("GET", Endpoints.TatakformsSlug, { slug: route.params.slug as string }, response => {
      isLoading.value = false;
      
      if (response.success) {
        console.log(response.data)
        event.value = response.data
        return;
      }

      errorMessage.value = response.message;
      toast.error(response.message);
    });
      return;
    }

    errorMessage.value = response.message;
    toast.error(response.message);
  });

  sal();
});

function generateQrCode(){
  const id = dialog.open({
    title: `Your QR Code`,
    message: `
      <div class="">
        <img style="height: 250px;" src="${Config.API_URL}/qrcode?q=CSPS${store.user.student_id}" />
      </div>
    `,
    cancel: null,
    ok: {
      text: "Close",
      click() {
        dialog.close(id);
      }
    }
  });
}


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