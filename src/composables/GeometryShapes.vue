<template>
  <div class="flex justify-between absolute left-0 right-0 z-[1000]">
    <div class="left">
      <div class="yellow" />
      <div class="primary" />
      <div class="gray" />
    </div>
    <div class="right">
      <div class="yellow" />
      <div class="primary" />
      <div class="gray" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left {
  @apply absolute left-0;

  .yellow {
    @apply skew-x-[-35deg];
  }

  .primary {
    @apply skew-x-[-35deg] left-6;
  }

  .gray {
    @apply skew-x-[-35deg] left-6;
  }
}

.right {
  @apply absolute right-0;

  .yellow {
    @apply skew-x-[35deg] absolute right-0;
  }

  .primary {
    @apply skew-x-[35deg] absolute right-6;
  }

  .gray {
    @apply skew-x-[35deg] absolute right-6;
  }
}

.yellow {
  height: 150px;
  width: 50px;

  @apply absolute bg-secondary;
}

.primary {
  height: 300px;
  width: 75px;
  
  @apply absolute -top-10 bg-primary;
  
}

.gray {
  height: 300px;
  width: 75px;
  
  @apply absolute top-[66px] bg-[#e3e3e3];
}
</style>