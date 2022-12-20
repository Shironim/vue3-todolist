<script setup>
import { ref, reactive } from 'vue'
// Input Data
// const inputTask = ref('')
// const inputDeskripsi = ref('')
// const newTodoType = ref('Personal')
const inputData = reactive({
  task: "",
  deskripsi: "",
  type: "Personal",
  date: ""
})
const emit = defineEmits(['tambahTask'])

</script>
<template>
  <form v-on:submit.prevent="$emit('tambahTask', inputData)"
    class="bg-white shadowApp rounded-sm overflow-hidden header">
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