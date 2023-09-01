<template>
  <div class="bg-surface-container-low rounded-2xl p-6 relative" role="button">
    <md-ripple />
    <div class="flex gap-5">
      <div class="flex-grow flex flex-col justify-between text-on-surface-variant">
        <div class="flex justify-between gap-6">
          <div>
            <h3 class="body-large font-medium mb-0 flex items-center gap-1 text-primary">
              {{ student.first_name }} {{ student.last_name }}
            </h3>
            <h3 class="body-medium font-medium">{{ student.email_address }}</h3>
            <h5 class="body-medium mt-2">{{ mapYear(student.year_level) }}</h5>
          </div>

          <div class="mt-0.5 body-medium font-medium">
            <span>{{ student.student_id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/divider/divider";
import "@material/web/iconbutton/icon-button";
import "@material/web/chips/assist-chip";
import "@material/web/button/filled-button";
import "@material/web/ripple/ripple";

// import VImage from "~/components/VImage.vue";
// import ImageTemplate from "~/composables/ImageTemplate.vue";
// import { icon } from "~/utils/icon";
// import { getReadableDate } from "~/utils/date";

defineProps<{
  student: StudentModel;
}>();

function mapYear(year: number | string): string {
  if (typeof year === "string") {
    year = parseInt(year);
  }

  switch (year) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    default:
      return "Unknown";
  }
}
</script>