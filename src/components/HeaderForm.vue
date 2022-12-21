<script setup>
import { reactive } from 'vue'
import { GraphQLClient } from 'graphql-request'
import { ADD_TUGAS } from '../hygraph/query'
const HYGRAPH_API = import.meta.env.VITE_HYGRAPH_API
const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_TOKEN

const inputData = reactive({
  task: "",
  deskripsi: "",
  type: "Personal",
  date: ""
})

const emit = defineEmits(['update-data'])

// Save 
const addTodo = async () => {
  // event.preventDefault();

  const graphQLClient = new GraphQLClient(HYGRAPH_API, {
    headers: {
      authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
  })
  const variables = {
    tugas: inputData.task,
    start: getDateNow(),
    deadline: getDateNow(inputData.date),
    deskripsi: inputData.deskripsi,
    kategori: inputData.type,
    publish: inputData.task,
  }
  await graphQLClient.request(ADD_TUGAS, variables)
  resetInput();
}

const resetInput = () => {
  inputData.task = "";
  inputData.deskripsi = "";
  inputData.type = "Personal";
  inputData.date = "";
}
// Get Date Now
const getDateNow = (tgl) => {
  if (!tgl) {
    var date = new Date();
  } else {
    var date = tgl;
  }
  let tahun = date.getFullYear();
  let bulan = date.getMonth();
  let spesifikDate = date.getDate();

  switch (bulan) {
    case 0: bulan = "Jan"; break;
    case 1: bulan = "Feb"; break;
    case 2: bulan = "Mar"; break;
    case 3: bulan = "Apr"; break;
    case 4: bulan = "Mei"; break;
    case 5: bulan = "Jun"; break;
    case 6: bulan = "Jul"; break;
    case 7: bulan = "Agu"; break;
    case 8: bulan = "Sep"; break;
    case 9: bulan = "Okt"; break;
    case 10: bulan = "Nov"; break;
    case 11: bulan = "Des"; break;
  }
  return `${tahun}-${bulan}-${spesifikDate}`
}



</script>
<template>
  <form v-on:submit.prevent="(addTodo)" class="bg-white shadowApp rounded-sm overflow-hidden header">
    <div class="p-8">
      <h1 class="text-3xl font-bold text-center mb-6">Get Your Jobs Done</h1>
      <div class="grid grid-flow-row">
        <div>
          <label for="" class="text-md font-bold">Task</label>
          <input type="text" v-model="inputData.task" class="w-full border-2 rounded-md px-3 py-2 border-blue-300 mb-2">
        </div>
        <div>
          <label for="" class="text-md font-bold">Deskripsi</label>
          <input type="text" v-model="inputData.deskripsi"
            class="w-full border-2 rounded-md px-3 py-2 border-blue-300 mb-2">
        </div>
        <v-date-picker v-model="inputData.date" :input-debounce="500">
          <template v-slot="{ inputValue, inputEvents }">
            <label class="text-md font-bold" for="">Deadline </label>
            <input class="w-full bg-white border-2 rounded-md px-3 py-2 border-blue-300 mb-2"
              placeholder="22 Desember 2022" :value="inputValue" v-on="inputEvents" />
          </template>
        </v-date-picker>
        <section class="grid grid-flow-col place-content-evenly">
          <div>
            <input type="radio" name="type" id="Personal" v-model="inputData.type" value="Personal">
            <label class="px-2 text-md" for="">Personal</label>
          </div>
          <div>
            <input type="radio" name="type" id="College" v-model="inputData.type" value="College">
            <label class="px-2 text-md" for="">College</label>
          </div>
          <div>
            <input type="radio" name="type" id="Intern" v-model="inputData.type" value="Intern">
            <label class="px-2 text-md" for="">Intern</label>
          </div>
        </section>
      </div>
    </div>
    <button type="submit" class="w-full bg-sky-900 py-3 text-xl font-bold text-white">ADD TASK</button>
  </form>
</template>
<style scoped>
.header {
  border-radius: 4rem 0 0 0 !important;
}
</style>