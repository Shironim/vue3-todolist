<script setup>
import HeaderForm from './components/HeaderForm.vue'
import FilterComponent from './components/FilterComponent.vue'
import ListTask from './components/ListTask.vue'
import Pagination from './components/Pagination.vue'
import { ref, computed, onBeforeMount, watch } from 'vue'

// All Data
const allTask = ref([
  {
    id: 1,
    task: "Task1",
    kategori: "Personal",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    id: 2,
    task: "Task2",
    kategori: "College",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    id: 3,
    task: "Task3",
    kategori: "Intern",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    id: 4,
    task: "Task4",
    kategori: "Intern",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    id: 5,
    task: "Task5",
    kategori: "College",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
  {
    id: 6,
    task: "Task6",
    kategori: "Personal",
    status: "Done",
    deskripsi: "lorem lorem ga tuh",
    start: "12 Des 2022",
    end: "15 Des 2022"
  },
])
// Paginasi
const currentPage = ref(1);
const postsPerPage = ref(4);
const jumlahPost = allTask.value.length;
const indexOfLastPost = currentPage.value * postsPerPage.value;
const indexOfFirstPost = indexOfLastPost - postsPerPage.value;
const currentPosts = allTask.value.slice(indexOfFirstPost, indexOfLastPost);

const paginate = computed(() => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jumlahPost / postsPerPage.value); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
})
const gantiHalaman = (page) => {
  currentPage.value = page;
}

// console.log(indexOfFirstPost, indexOfLastPost, currentPosts)

// Filter & Kategori
const activeFilter = ref('All')
const allKategori = ref(['Personal', 'College', 'Intern'])
const filter = (type) => {
  activeFilter.value = type
}
// Get Data
const getTodo = computed(() => {
  if (activeFilter.value === 'All') {
    return currentPosts;
  }
  return allTask.value.filter((item) => item.kategori == activeFilter.value)
})

// Save 
const addTodo = (data) => {
  // event.preventDefault();
  if (data) {
    allTask.value.push({
      task: data.task,
      kategori: data.type,
      deskripsi: data.deskripsi,
      start: getDateNow(),
      end: getDateNow(data.date),
    })
  };
  // resetInput();
  // console.log(getDateNow(data.date));
}
// Reset after submit ? ada 2
// 1 jika di child, berarti butuh callback utk manggil resetInput jika emit dijalankan
// atau, jika di parent, maka ref / reactive nya juga di parent -> ini tidak berhasil
// const resetInput = () => {
//   inputData.value = '';
//   newTodoType.value = 'Personal'
// }
// Get Date Now
const getDateNow = (tgl) => {
  // console.log(tgl)
  if (!tgl) {
    // console.log('dari !tgl', tgl)
    var date = new Date();
    // return date;
    // console.log(date)
  } else {
    // console.log('dari tgl', tgl)
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
  return `${spesifikDate} ${bulan} ${tahun}`
}

// Delete data
const deleteData = (data) => {
  allTask.value.map((item, index) => {
    if (index == data) {
      // console.log(item)
      // cek selected item, and then splice array
      return allTask.value.splice(data, 1)
    }
  })
  // console.log(data)
}

// Calendar
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const attrs = ref([
  {
    dot: true,
    dates: [
      new Date(2022, 11, 1), // Jan 1st
      new Date(2022, 11, 10), // Jan 10th
      new Date(2022, 11, 15), // Jan 10th
      new Date(2022, 11, 22), // Jan 22nd
    ],
  },
  {
    dot: 'red',
    dates: [
      new Date(2022, 11, 4), // Jan 4th
      new Date(2022, 11, 10), // Jan 10th
      new Date(2022, 11, 15), // Jan 15th
    ],
  },
  {
    dot: {
      style: {
        backgroundColor: 'brown',
      },
    },
    dates: [
      new Date(2022, 11, 12), // Jan 12th
      new Date(2022, 11, 26), // Jan 26th
      new Date(2022, 11, 15), // Jan 15th
    ],
  },
])
</script>

<template class="bg-sky-500">
  <!-- <v-date-picker /> -->
  <div class="todo">
    <HeaderForm @tambahTask="addTodo" />
    <!-- <form v-on:submit="addTodo" class="bg-white shadowApp rounded-sm overflow-hidden header">
    <div class="p-8">
      <h1 class="text-2xl font-bold text-left mb-6">Add Task</h1>
      <div class="grid grid-flow-row">
        <input type="text" v-model="inputData" class="w-full border-2 rounded-lg px-4 py-3 border-blue-300 mb-2">
        <section class="grid grid-flow-col place-content-evenly">
          <div>
            <input type="radio" name="type" id="Personal" v-model="newTodoType" value="Personal">
            <label class="px-2 text-md" for="">Personal</label>
          </div>
          <div>
            <input type="radio" name="type" id="College" v-model="newTodoType" value="College">
            <label class="px-2 text-md" for="">College</label>
          </div>
          <div>
            <input type="radio" name="type" id="Intern" v-model="newTodoType" value="Intern">
            <label class="px-2 text-md" for="">Intern</label>
          </div>
        </section>
      </div>
    </div>
    <button type="submit" class="w-full bg-sky-900 py-3 text-xl font-bold text-white">ADD TASK</button>
  </form> -->
    <main class="mt-6">
      <section class="bg-white mb-6 shadowApp rounded grid gap-y-4 p-4">
        <h2 class="text-2xl pb-4 font-bold">Categories</h2>
        <!-- filterKategori dari FilterComponent, di pass dengan param, tapi disini ga perlu ditulis paramnya -->
        <FilterComponent :kategoris="allKategori" :activeFilter="activeFilter" @filterKategori="filter" />
      </section>
      <section class="shadowApp mb-2 bg-white p-4 grid gap-y-4 rounded">
        <ListTask :getTodo="getTodo" @hapus="deleteData" />
      </section>
      <section class="shadowApp bg-white p-4 grid gap-y-4 rounded">
        <Pagination :paginate="paginate" :currentPage="currentPage" @changePage="gantiHalaman" />
      </section>
    </main>
  </div>


  <!-- <RouterView /> -->
</template>

<style>
.shadowApp {
  box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.1);
}

#app {
  /* width: 1280px; */
  /* margin: 0 auto; */
  padding: 4rem 0;
  background-color: rgb(14 165 233);
}

.todo {
  width: 500px;
  /* margin: 4rem auto; */
  margin: 0 auto;
}
</style>