<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-on-surface-variant">
      <thead class="text-xs bg-surface-container-high uppercase">
        <tr>
          <th
            v-for="header in headers"
            :key="header.id"
            scope="col"
            class="th-cell"
            :class="mapAlign(header.align)"
          >
            {{ header.text }}
          </th>

          <th v-if="!noAction" class="th-cell w-0">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in data" class="bg-surface-container-low hover:bg-surface-container">
          <td
            v-for="header in headers"
            :key="header.id"
            :title="((row as Record<string, unknown>)[header.id] as string)"
            class="td-cell"
            :class="mapAlign(header.align)"
          >
            <div v-if="loading" class="skeleton" :style="'width: ' + (Math.random() * 100)  + '%'" />
            <slot v-else :name="header.id" :row="row">
              {{ (row as Record<string, unknown>)[header.id] }}
            </slot>
          </td>

          <td v-if="!noAction" class="td-cell w-0">
            <div class="flex gap-3">
              <md-assist-chip @click="emit('edit', row)" label="Edit" />
              <md-assist-chip v-if="!noDelete" @click="emit('delete', row)" label="Delete" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/chips/assist-chip";

withDefaults(defineProps<{
  headers: TableHeader[],
  data: any[],
  loading?: boolean,
  noAction?: boolean,
  noDelete?: boolean,
}>(), {
  noAction: false,
  noDelete: false,
  loading: false,
});

const emit = defineEmits(["edit", "delete"]);

/**
 * Maps the align prop to a tailwind class
 */
function mapAlign(align?: string) {
  if (!align) return "";

  switch (align) {
    case "left":
      return "text-start";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
  }

  return "";
}
</script>

<style lang="scss" scoped>
@mixin truncate {
  @apply whitespace-nowrap overflow-hidden text-ellipsis;
}

.td-cell {
  @apply px-6 py-4;
  @include truncate;
}

.th-cell {
  @apply px-6 py-3;
  @include truncate;
}

.skeleton {
  @apply bg-surface-container-highest rounded-full animate-pulse h-[1rem] my-1.5;
}
</style>