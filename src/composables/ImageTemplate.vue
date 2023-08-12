<template>
  <div class="template">
    <md-icon v-html="icon('photo_camera')" />
  </div>  
</template>

<script lang="ts" setup>
import { icon } from "~/utils/icon";
import "@material/web/icon/icon"
</script>

<style lang="scss">
.template {
  @apply bg-surface-container-low dark:bg-surface-container-low rounded-xl px-4 flex
    justify-center items-center h-44 lg:h-52 2xl:h-64;

  md-icon {
    width: 48px;
    height: 48px;
  }
}
</style>