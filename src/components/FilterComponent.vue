<script setup>
// const props = defineProps(['kategori'])
const props = defineProps({
  kategoris: {
    type: Array,
    default: [],
  },
  activeFilter: {
    type: String,
    default: 'All',
  }
})
const emit = defineEmits(['filterKategori'])
</script>
<template>
  <!-- {{ kategori }} -->
  <div class="grid grid-flow-col gap-x-4">
    <!-- handle event dari child $emit -->
    <button v-on:click="$emit('filterKategori', 'All')" type="button" class="shadow-sm rounded px-2 py-1  w-full"
      :class="[activeFilter === 'All' ? 'bg-sky-300 font-bold text-white' : 'bg-sky-100']">All</button>
    <div v-for="(kategori, i) in kategoris" :key="i">
      <!-- Emit with parameter -->
      <button type="button" v-on:click="$emit('filterKategori', kategori)"
        :class="[activeFilter === kategori ? 'bg-sky-300 font-bold text-white' : 'bg-sky-100']"
        class="shadow-sm rounded px-2 py-1 w-full">{{
    kategori
        }}</button>
    </div>
  </div>
</template>