<template>
    <div class="container mx-auto">
        <div class="my-8 text-center">
            <h4 class="mb-2 text-2xl font-bold">Tatak Forms Request</h4>
            <p>Get your tatak forms here my niggas.</p>
        </div>
        <div class="flex justify-center flex-wrap gap-6">
        <div class="event -translate-y-1 px-6 w-full 3xl:w-3/5 !overflow-visible">
            <md-ripple />
            <router-link :to="'/tatakforms/universitydays'" tabindex="-1">
            <div class="flex flex-wrap gap-6">
                <div class="flex h-64 w-64 items-center justify-center foreground object py-2">
                    <VImage
                    class="rounded-xl"
                    src="/src/assets/img/tatakform/uc.jpg"
                    />
                </div>

                <div class="content pt-1 pb-3">
                    <div class="w-full">
                      <h5 class="label-large mb-3 text-error">Coming Soon</h5>
                      <h4 class="title-large font-bold">University Days</h4>
                      <h3 class="mb-8 flex items-center">
                        <md-icon class="mr-2" v-html="icon('event')" />
                        March 7 to March 9
                      </h3>
                    </div>
                </div>
            </div>
            </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import VImage from '../../components/VImage.vue';
import { icon } from '~/utils/icon';
import "@material/web/icon/icon";

</script>


<style lang="scss" scoped>
.event {
  @apply flex flex-col justify-between relative bg-surface-container-low rounded-xl w-min;
  animation: glow 1.5s ease-in-out infinite alternate;

  .foreground {
    @apply bg-surface-container rounded-xl;
  }

  .content {
    @apply px-5 font-medium rounded-2xl;

    h4 {
      @apply text-on-surface-variant mb-1;
    }
  }
}
</style>