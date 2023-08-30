<template>
  <div class="page" :class="{ 'inner': inner }" ref="fullpage">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import anime from "animejs/lib/anime.es.js";

const fullpage = ref();

defineProps({
  inner: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  if (window.outerWidth < 1024 || window.innerWidth <= 1536) {
    return;
  }

  const scrollElement =
      window.document.scrollingElement ||
      window.document.body ||
      window.document.documentElement;

  let instance: anime.AnimeInstance | undefined;
  
  // Sections are zero indexed to match array from getElementsByClassName
  let scroll = {
    activeSection: 0,
    totalSections: fullpage.value.getElementsByClassName('section').length,
    throttled: false,
    throttleDur: 500,
  }
  
  let downSection = () => {
    if (scroll.activeSection < 4) {
      ++scroll.activeSection
      scrollToSection(scroll.activeSection)
    }
  }
  
  let upSection = () => {
    if (scroll.activeSection > 0) {
      --scroll.activeSection
      scrollToSection(scroll.activeSection)
    }
  }
  
  let scrollToSection = (section: number) => {
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
  
  window.addEventListener("keydown", function(e) {
    if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) === -1) {
      e.preventDefault();
    }

    if (!scroll.throttled) {
      scroll.throttled = true
      
      setTimeout(function() {
        scroll.throttled = false
      }, 1.5 * scroll.throttleDur)
      
      if ([' ', 'ArrowDown'].indexOf(e.key) > -1) {
        downSection()
      }
      if (['ArrowUp'].indexOf(e.key) > -1) {
        upSection()
      }
    }

  }, false)
  
  window.addEventListener('scroll', function(e) {
    e.preventDefault()
  }, false)
  
  window.addEventListener('wheel', function(e) {
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
  }, { passive: false })
  
  let initialY: number | undefined;
  
  window.addEventListener('touchstart', function(e) {
    if (e.touches && e.touches.length > 0) {
      initialY = e.touches[0].clientY
    }
  }, false)
  
  window.addEventListener('touchmove', function(e) {
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
  }, {passive: false})

  window.addEventListener('resize', function() {
    scrollToSection(scroll.activeSection)
  }, false)
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
</style>