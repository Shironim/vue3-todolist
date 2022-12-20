<template>
  <div class="grid grid-flow-col place-self-center">
    <!-- Pagination belum jalan -->
    <span v-for="page in paginate" @click="$emit('changePage', page)"
      :class="[currentPage == page ? 'font-bold text-white bg-sky-900' : '']"
      class="px-2 py-1 mr-2 border rounded border-sky-400 text-md">{{ page }}</span>
  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount, onMounted } from 'vue'

const props = defineProps({
  paginate: {
    type: Array,
    default: [],
  },
  currentPage: {
    type: Number,
    default: 0,
  }
})
const emit = defineEmits(['changePage'])
// IDK cant use props in here

// console.log(totalPost.value)

</script>