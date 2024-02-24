<template>
  <div class="container mx-auto px-6">
    <div class="my-2 text-center">
      <h4 class="text-2xl font-bold">Tatak Forms Request</h4>
      <div class="flex mt-1 items-center flex-col justify-center">
        <p class="mb-2">New here? Click the button below to know the process.</p>
      </div>
    </div>
    <div class="flex justify-center flex-wrap gap-6">
      <div
        v-for="form in tatakforms"
        :key="form.id"
        class="event px-5 py-5 mt-5 -translate-y-1 w-full sm:w-2/3 md:w-2/5 lg:w-1/3 xl:w-min !overflow-visible"
      >
        <md-ripple />
        <router-link :to="`/tatakforms/${form.slug}`" tabindex="-1">
          <div class="content">
            <div class="w-full">
              <h5 class="label-large mb-2 text-error">Coming Soon</h5>
              <h4 class="title-large font-bold">{{ form.name }}</h4>
              <h3 class="flex items-center">
                <md-icon class="mr-2" v-html="icon('event')" />
                {{ dayjs(form.from_date).format("MMMM DD") }} to {{ dayjs(form.to_date).format("MMMM DD") }}
              </h3>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { icon } from '~/utils/icon';
import { onMounted, ref } from 'vue';
import { Endpoints, makeRequest } from '~/network/request';
import { toast } from 'vue3-toastify';
import dayjs from "dayjs";

import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

const tatakforms = ref<TatakformModel[]>([]);

onMounted(() => {
  makeRequest<TatakformModel[], null>("GET", Endpoints.Tatakforms, null, response => {
    if (response.success) {
      tatakforms.value = response.data;
      return;
    }

    toast.error(response.message);
  });
});
</script>


<style lang="scss" scoped>
.event {
  @apply flex flex-col justify-between relative bg-surface-container-low rounded-xl;
  animation: glow 1.5s ease-in-out infinite alternate;

  .foreground {
    @apply bg-surface-container rounded-xl;
  }

  .content {
    @apply font-medium rounded-2xl;

    h4 {
      @apply text-on-surface-variant mb-1;
    }
  }
}
</style>