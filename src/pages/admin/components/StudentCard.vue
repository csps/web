<template>
  <div class="bg-surface-container-low rounded-2xl p-6">
    {{ student }}
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/iconbutton/icon-button";
import "@material/web/chips/assist-chip";
import "@material/web/button/filled-button";

// import VImage from "~/components/VImage.vue";
// import ImageTemplate from "~/composables/ImageTemplate.vue";
// import { icon } from "~/utils/icon";
// import { getReadableDate } from "~/utils/date";

defineProps<{
  student: StudentModel;
}>();
</script>
