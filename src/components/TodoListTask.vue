<script setup>
import { ref, computed } from 'vue'
import FilterComponent from './FilterComponent.vue'
import ListTask from './ListTask.vue'
import Pagination from './Pagination.vue'
import { GraphQLClient } from 'graphql-request'
import { DELETE_TASK, TASK_QUERY } from '../hygraph/query'
const HYGRAPH_API = import.meta.env.VITE_HYGRAPH_API
const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_TOKEN
// All Data
// const allTask = ref([
//   {
//     id: 1,
//     task: "Task1",
//     kategori: "Personal",
//     status: "Done",
//     deskripsi: "lorem lorem ga tuh",
//     start: "12 Des 2022",
//     end: "15 Des 2022"
//   },
//   {
//     id: 2,
//     task: "Task2",
//     kategori: "College",
//     status: "Done",
//     deskripsi: "lorem lorem ga tuh",
//     start: "12 Des 2022",
//     end: "15 Des 2022"
//   },
//   {
//     id: 3,
//     task: "Task3",
//     kategori: "Intern",
//     status: "Done",
//     deskripsi: "lorem lorem ga tuh",
//     start: "12 Des 2022",
//     end: "15 Des 2022"
//   },
//   {
//     id: 4,
//     task: "Task4",
//     kategori: "Intern",
//     status: "Done",
//     deskripsi: "lorem lorem ga tuh",
//     start: "12 Des 2022",
//     end: "15 Des 2022"
//   },
//   {
//     id: 5,
//     task: "Task5",
//     kategori: "College",
//     status: "Done",
//     deskripsi: "lorem lorem ga tuh",
//     start: "12 Des 2022",
//     end: "15 Des 2022"
//   },
//   {
//     id: 6,
//     task: "Task6",
//     kategori: "Personal",
//     status: "Done",
//     deskripsi: "lorem lorem ga tuh",
//     start: "12 Des 2022",
//     end: "15 Des 2022"
//   },
// ])

// Paginasi

const props = defineProps({
  datas: {
    type: Array,
    default: [{
      task: "dummy",
      kategori: "dummy",
      deskripsi: "dummy",
      start: "dummy",
      end: "dummy",
    }],
  }
})

const data = ref([])

// Pagination
// NOTE : get data dari props (datas), slice di pagination, baru ditampilkan (render), terus gimana di kategori juga post per page ?
const currentPage = ref(1);
const postsPerPage = ref(2); // size

// Filter & Kategori
const activeFilter = ref('All')
const allKategori = ref(['Personal', 'College', 'Intern'])
const filter = (type) => {
  activeFilter.value = type;
  currentPage.value = 1;
}

// Get Data
const getTodo = computed(() => {
  if (activeFilter.value === 'All') {
    return props.datas[0]?.tasks;
  }
  return props.datas[0]?.tasks?.filter((item) => {
    return item.kategori == activeFilter.value
  })
})
const gantiHalaman = (page) => {
  currentPage.value = page;
}
const getPerPaginate = computed(() => {
  const indexOfLastPost = currentPage.value * postsPerPage.value;
  const indexOfFirstPost = indexOfLastPost - postsPerPage.value;
  return getTodo?.value?.slice(indexOfFirstPost, indexOfLastPost);
})

const paginate = computed(() => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(getTodo?.value?.length / postsPerPage.value); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
})

// Delete data
const emit = defineEmits(['update-data'])

const deleteData = async (data) => {
  const graphQLClient = new GraphQLClient(HYGRAPH_API, {
    headers: {
      authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
  })
  const variables = {
    tugas: data,
  }
  await graphQLClient.request(DELETE_TASK, variables)
  emit('update-data', TASK_QUERY)
  alert("Data Dihapus")
}
</script>
<template>
  <main class="mt-6">
    <section class="bg-white mb-6 shadowApp rounded grid gap-y-4 p-4">
      <h2 class="text-2xl pb-4 font-bold">Categories</h2>
      <FilterComponent :kategoris="allKategori" :activeFilter="activeFilter" @filterKategori="filter" />
    </section>
    <section class="shadowApp mb-2 bg-white p-4 grid gap-y-4 rounded">
      <ListTask :listTaskPerPaginate="getPerPaginate" @hapus="deleteData" />
    </section>
    <section class="shadowApp bg-white p-4 grid gap-y-4 rounded">
      <Pagination :paginate="paginate" :currentPage="currentPage" @changePage="gantiHalaman" />
    </section>
  </main>
</template>