<template>
  <div class="bg-surface-container-low rounded-2xl p-7 relative" role="button" title="Edit announcement">
    <md-ripple />
    <div class="flex justify-between items-center mb-1">
      <div class="label-large font-medium">
        <h3 class="title-medium text-primary font-medium">{{ data.title }}</h3>
      </div>
      <h6 class="label-medium">#{{ data.id }}</h6>
    </div>

    <div class="body-small text-justify">
      {{ data.content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/ripple/ripple"
import "@material/web/iconbutton/icon-button"

defineProps<{
  data: AnnouncementModel
}>();
</script>

<style lang="scss" scoped>
md-icon.verified {
  @apply w-3.5 h-3.5 text-primary;
}
</style>