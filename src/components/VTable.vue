<template>
  <div class="relative overflow-x-auto border-outline-variant sm:rounded-lg font-reset">
    <table class="w-full text-sm text-left text-on-surface-variant">
      <thead class="text-sm bg-surface-container-high">
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

      <tbody :class="{ 'hover-show-actions': hoverShowActions }">
        <tr
          v-for="row in data"
          :key="row.student_id"
          @click="emit('row-click', row)"
          :class="{ 'cursor-pointer': clickableRow }"
          class="bg-surface-container hover:bg-surface-container-high"
        >
          <td
            v-for="header in headers"
            :key="header.id"
            :title="((row as Record<string, unknown>)[header.id] as string)"
            class="td-cell"
            :style="header.max ? 'max-width: ' + header.max + 'px' : ''"
            :class="mapAlign(header.align)"
          >
            <div v-if="loading" class="skeleton" :style="'width: ' + (Math.random() * 100)  + '%'" />
            <slot v-else :name="header.id" :row="row">
              {{ (row as Record<string, unknown>)[header.id] }}
            </slot>
          </td>

          <td v-if="!noAction" class="td-cell w-0">
            <div class="action">
              <slot name="actions" :row="row">
                <div class="flex gap-3">
                  <md-assist-chip @click="emit('edit', row)" label="Edit" />
                  <md-assist-chip v-if="!noDelete" @click="emit('delete', row)" label="Delete" />
                </div>
              </slot>
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
  clickableRow?: boolean,
  hoverShowActions?: boolean
}>(), {
  noAction: false,
  noDelete: false,
  loading: false,
  clickableRow: false,
  hoverShowActions: false
});

const emit = defineEmits(["edit", "delete", "row-click"]);

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
  @apply px-6 py-3 text-on-surface;
  @include truncate;
}

.th-cell {
  @apply px-6 py-3;
  font-weight: 500;
  @include truncate;
}

.skeleton {
  @apply bg-surface-container-highest rounded-full animate-pulse h-[1rem] my-1.5;
}

.font-reset {
  font-family: Roboto, Arial, sans-serif;
}

.action {
  visibility: hidden;
}

tbody.hover-show-actions tr:hover .action {
  visibility: visible;
}
</style>