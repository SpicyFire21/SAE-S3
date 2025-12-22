<!-- DataTable.vue -->
<template>
  <table class="w-full border border-[var(--noir)] border-collapse text-sm">
    <thead>
    <tr class="bg-[var(--gris)]">
      <th
          v-for="header in headers"
          :key="header"
          class="border border-[var(--noir)] px-3 py-2 font-semibold text-left"
      >
        {{ header }}
      </th>

      <th class="border border-[var(--noir)] px-3 py-2 font-semibold text-left">
        actions
      </th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="(item, idx) in items"
        :key="idx"
        class="hover:bg-[var(--jaune)]"
    >
      <td
          v-for="header in headers"
          :key="header + idx"
          class="border border-[var(--noir)] px-3 py-2"
      >
        <slot
            :name="header"
            :item="item"
        >
          {{ item[header] }}
        </slot>
      </td>


      <!-- Colonne actions -->
      <td class="border border-[var(--noir)] px-3 py-2">
        <slot name="actions" :item="item"></slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headers: Array,
  items: Array
})
</script>
