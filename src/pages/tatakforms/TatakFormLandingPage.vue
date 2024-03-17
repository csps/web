<template>
  <div class="bg-surface-variant dark:bg-surface-container-high flex-grow relative h-full -z-[0]">
    
  </div>
</template>

<script lang="ts" setup>

import "@material/web/iconbutton/icon-button";
import "@material/web/progress/linear-progress";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/chips/assist-chip";
import "@material/web/chips/filter-chip";

</script>

<style lang="scss" scoped>
md-circular-progress {
  --md-circular-progress-size: 48px;
  --md-circular-progress-active-indicator-width: 10;
}

md-assist-chip {
  --_label-text-color: var(--md-sys-color-secondary);
  --_hover-label-text-color: var(--md-sys-color-primary);
}
</style>