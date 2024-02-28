<template>
  <div class="page" :class="{ 'inner': inner }" ref="fullpage">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import anime from "animejs/lib/anime.es.js";

const fullpage = ref();

defineProps({
  inner: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  if (window.outerWidth < 728) {
    return;
  }

  let initialY: number | undefined;

  const scrollElement =
      window.document.scrollingElement ||
      window.document.body ||
      window.document.documentElement;

  let instance: anime.AnimeInstance | undefined;
  
  const scroll = {
    activeSection: 0,
    totalSections: fullpage.value.getElementsByClassName('section').length,
    throttled: false,
    throttleDur: 500,
  };
  
  const downSection = () => {
    if (scroll.activeSection < 4) {
      ++scroll.activeSection
      scrollToSection(scroll.activeSection)
    }
  }
  
  const upSection = () => {
    if (scroll.activeSection > 0) {
      --scroll.activeSection
      scrollToSection(scroll.activeSection)
    }
  }
  
  const scrollToSection = (section: number) => {
    if (instance) {
      instance.pause()
    }

    instance = anime({
      targets: scrollElement,
      scrollTop: (section) * window.innerHeight,
      duration: scroll.throttleDur,
      easing: 'easeInOutCubic'
    })
    
    scroll.activeSection = section
  }

  function eventScroll(e: Event) {
    e.preventDefault()
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault()
    
    if (!scroll.throttled) {
      scroll.throttled = true
      
      setTimeout(function() {
        scroll.throttled = false
      }, 1.5 * scroll.throttleDur)
      
      if(e.deltaY < 0) {
        upSection()
      } else {
        downSection()
      }
    } 
  }

  function eventTouchstart(e: TouchEvent) {
    if (e.touches && e.touches.length > 0) {
      initialY = e.touches[0].clientY
    }
  }

  function eventTouchmove(e: TouchEvent) {
    e.preventDefault()
    
    if (initialY === undefined) {
      return
    }
    
    let currentY = 0;

    if (e.touches && e.touches.length > 0) {
      initialY = e.touches[0].clientY
    }

    let diffY = initialY - currentY;
    
    if(!scroll.throttled) {
      scroll.throttled = true
      
      setTimeout(function() {
        scroll.throttled = false
      }, 1.5 * scroll.throttleDur)
      
      if (diffY > 0) {
        downSection()
      } else {
        upSection()
      }
    }
    
    initialY = undefined;
  }

  function eventResize() {
    scrollToSection(scroll.activeSection);
  }
  
  window.addEventListener('scroll', eventScroll, false);
  window.addEventListener('wheel', eventWheel, { passive: false })
  window.addEventListener('touchstart', eventTouchstart, false)
  window.addEventListener('touchmove', eventTouchmove, { passive: false })
  window.addEventListener('resize', eventResize, false)

  onUnmounted(() => {
    window.removeEventListener('scroll', eventScroll, false);
    window.removeEventListener('wheel', eventWheel);
    window.removeEventListener('touchstart', eventTouchstart, false);
    window.removeEventListener('touchmove', eventTouchmove);
    window.removeEventListener('resize', eventResize, false);
  });
});
</script>

<style lang="scss">
.page {
  section {
    @apply m-0 p-0 flex justify-center items-center min-h-[100dvh] overflow-hidden;
  }

  &.inner section {
    @apply -translate-y-20;

    &:first-child {
      @apply relative -z-[1];
    }
  }
}

.page.maintain-z.inner section:first-child {
  @apply z-[1];
}
</style>