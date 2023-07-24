<template>
  <router-link v-if="to" :to="to">
    <component
      :is="getComponentByVariant(variant)"
      :trailingIcon="trailingIcon"
      class="md3-button"
      :class="{
        'transparent': color === 'transparent',
        'primary': color === 'primary',
        'secondary': color === 'secondary',
        'tertiary': color === 'tertiary',
        'inverse': color === 'inverse',
      }"
    >
      <slot />

      <md-icon slot="icon" v-if="trailingIcon" v-html="trailingIcon" />
      <md-icon slot="icon" v-if="leadingIcon" v-html="leadingIcon" />
    </component>
  </router-link>
</template>

<script lang="ts" setup>
import "@material/web/button/filled-button";
import "@material/web/button/tonal-button";
import "@material/web/button/outlined-button";
import "@material/web/button/elevated-button";
import "@material/web/button/text-button";
import "@material/web/icon/icon";

type ButtonVariant = "elevated" | "filled" | "outlined" | "tonal" | "text";
type ButtonColor = "primary" | "secondary" | "tertiary" | "transparent" | "inverse";

withDefaults(defineProps<{
  variant?: ButtonVariant,
  color?: ButtonColor,
  to?: string,
  trailingIcon?: string,
  leadingIcon?: string,
}>(), {
  variant: 'text',
  color: "primary",
});

/**
 * Get component by variant
 * @param variant Button variant
 */
function getComponentByVariant(variant?: ButtonVariant) {
  switch (variant) {
    case "elevated":
      return "md-elevated-button";
    case "filled":
      return "md-filled-button";
    case "outlined":
      return "md-outlined-button";
    case "tonal":
      return "md-tonal-button";
    case "text":
      return "md-text-button";
    default:
      return "md-elevated-button";
  }
}
</script>

<style lang="scss" scoped>
.md3-button {
  &.secondary {
    --md-sys-color-primary: theme("colors.secondary");
    --md-sys-color-on-primary: theme("colors.on-secondary");
  }

  &.tertiary {
    --md-sys-color-primary: theme("colors.csps-tertiary");
    --md-sys-color-on-primary: theme("colors.on-tertiary");
  }

  &.transparent {
    --md-sys-color-primary: theme("colors.surface");
    --md-sys-color-on-primary: theme("colors.on-surface");
  }

  &.inverse {
    --md-sys-color-primary: theme("colors.on-surface");
    --md-sys-color-on-primary: theme("colors.surface");
  }

  md-icon {
    --md-icon-size: 18px;
  }
}
</style>