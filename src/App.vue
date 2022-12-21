<script async setup>
import HeaderForm from './components/HeaderForm.vue'
import TodoListTask from './components/TodoListTask.vue';
import { ref } from 'vue'
import { GraphQLClient } from 'graphql-request'
import { TASK_QUERY } from './hygraph/query'

// HYGRAPH
const datas = ref([])
// const HYGRAPH_API = import.meta.env.VITE_HYGRAPH_API
const getData = async (TASK_QUERY) => {
  try {
    const client = new GraphQLClient("https://api-ap-northeast-1.hygraph.com/v2/clbnlvvtz16ct01up11r9brg1/master")
    const data = await client.request(TASK_QUERY)
    datas.value = data
  } catch (error) {
    console.log(error)
  } finally {
    // console.log(datas)
  }
}

if (datas.value == "") {
  getData(TASK_QUERY)
}

const coba = () => {
  console.log("testetstetet")
}

</script>

<template>
  <!-- <v-date-picker /> -->
  <div class="todo bg-sky-500 min-h-screen">
    <HeaderForm @update-data="getData" />

    <Suspense>
      <div>
        <TodoListTask @update-data="getData" :datas="[datas]" />
      </div>
      <template #fallback>
        <div>
          Loading
        </div>
      </template>
    </Suspense>
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