<template>
  <svg 
    :viewBox="`0 0 ${width} ${height}`" 
    :fill="fill"
    :height="height"
    :width="width"
    :style="{ transform: `rotate(${rotate}deg)`, display: 'inline-block' }"
  >
    <title v-if="title">{{ title }}</title>
    <path :d="path"></path>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
  fill: {
    type: String,
    default: 'currentColor',
  },
  rotate: {
    type: Number,
    default: 0
  },
  path: {
    type: String,
    default: '',
  },
})
</script>