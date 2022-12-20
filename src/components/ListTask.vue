<script setup>
const props = defineProps({
  getTodo: {
    type: Array,
    default: [{
      task: "dummy",
      kategori: "dummy",
      deskripsi: "dummy",
      start: "dummy",
      end: "dummy",
    },
    ]
  }
})
const emit = defineEmits(['hapus'])
</script>
<template>
  <h2 class="text-2xl font-bold">Work Todo</h2>
  <div v-for="(todo, index) in getTodo" :key="index" class="task pb-3">
    <div class="grid gap-4">
      <div class="grid place-content-between grid-flow-col">
        <h4 class="font-bold text-xl place-self-center">{{ todo.task }}</h4>
        <span class="bg-sky-900 p-2 rounded text-white font-bold">{{ todo.kategori }}</span>
      </div>
      <p v-if="todo.deskripsi">
        {{ todo.deskripsi }}
      </p>
      <p v-else>
        Tidak ada Deskripsi
      </p>
      <footer class="grid place-content-between grid-flow-col">
        <div>
          <p>
            <span>Start : </span><span class="italic">{{ todo.start }}</span>
          </p>
          <p>
            <span>End : </span>
            <span v-if="todo.end" class="italic font-bold">{{ todo.end }}</span>
            <span v-else class="text-small italic font-bold">Tanggal Belum Diatur</span>
          </p>
        </div>
        <div>
          <!-- <span class="border-2 shadow-sm mr-2 border-sky-200 rounded px-2 py-1">
            <font-awesome-icon icon="fa-solid fa-pen" class="text-sky-400" />
          </span> -->
          <span @click="$emit('hapus', index)" class="border-2 shadow-sm border-red-200 rounded px-2 py-1">
            <font-awesome-icon icon="fa-solid fa-trash" class="text-red-400" />
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.task:not(:last-child) {
  border-bottom: 2px solid;
}
</style>