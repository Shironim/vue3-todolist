<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed } from 'vue'

const todoTask = ref('')
const selected = ref('')
const allTask = ref([
  {
    task: "Task1",
    kategori: "magang",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    task: "Task2",
    kategori: "rumah",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    task: "Task3",
    kategori: "magang",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    task: "Task4",
    kategori: "rumah",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    task: "Task5",
    kategori: "magang",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    task: "Task6",
    kategori: "magang",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
])
const allKategori = ref(['magang', 'rumah'])
const filter = (event) => {
  console.log(event)
}
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="p-4">
    <h1 class="text-2xl font-bold text-center">Todo App's</h1>
  </header>
  <main class="p-4">
    <div class="grid grid-items-center mb-4">
      <div class="grid grid-cols-2 gap-x-4">
        <input type="text" v-model="todoTask" class="px-2 rounded border-red-400 border-2" placeholder="Add Task..">
        <button type="button" class="bg-indigo-500 rounded p-2 text-white">Add</button>
      </div>
    </div>
    <div class="grid grid-flow-col grid-cols-3 gap-4 mb-4">
      <span class="flex items-center">Filter</span>
      <div>
        <select v-model="selected" class="px-2 py-1 bg-red-300 rounded w-full" name="" id="">
          <option value="">Select</option>
          <option v-for="kategori in allKategori" v-bind:value="{ kategori: kategori }" value="{{kategori}}">{{ kategori
          }}
          </option>
        </select>
      </div>
      <div>
        <select class="px-2 py-1 bg-red-300 rounded w-full" name="" id="">
          <option value="">Done</option>
          <option value="">Ongoing</option>
          <option value="">Mangkrak</option>
        </select>
      </div>
    </div>
    <section class="listTask rounded grid gap-y-4">
      <section v-for="(todo, index) in allTask" class="task bg-white p-2">
        <div class="grid gap-4">
          <header class="grid place-content-between grid-flow-col">
            <h4 class="font-bold text-xl">{{ todo.task }}</h4>
            <span class="bg-gray-200 p-2 rounded">{{ todo.kategori }}</span>
          </header>
          <p>
            {{ todo.deskripsi }}
          </p>
          <footer class="grid place-content-between grid-flow-col">
            <div>
              <p>
                <span>Start : </span><span class="italic">{{ todo.start }}</span>
              </p>
              <p>
                <span>End : </span><span class="italic font-bold">{{ todo.end }}</span>
              </p>
            </div>
            <div>
              <span><font-awesome-icon icon="fa-solid fa-pen" /></span>
              <span><font-awesome-icon icon="fa-solid fa-trash" /></span>
            </div>
          </footer>
        </div>
      </section>
    </section>
  </main>

  <!-- <RouterView /> -->
</template>

<style scoped>
#app {
  width: 400px;
  margin: 0 auto;
  background-color: beige;
}
</style>