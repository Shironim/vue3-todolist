import { gql } from 'graphql-request'

export const TASK_QUERY = gql`
query MyQuery {
  tasks {
    tugas
    start
    deadline
    deskripsi
    kategori
  }
}
`
export const GET_QUERY_BY_KATEGORI = gql`
query MyQuery($kategori: String = "") {
  tasks(where: {kategori: $kategori}) {
    tugas
    start
    kategori
    deskripsi
    deadline
  }
}

`
export const ADD_TUGAS = gql`
mutation MyMutation($tugas: String = "", $start: String = "", $kategori: String = "", $deskripsi: String = "", $deadline: String = "", $publish: String = "") {
  createTask(
    data: {tugas: $tugas, start: $start, kategori: $kategori, deskripsi: $deskripsi, deadline: $deadline}
  ) {
    tugas
  }
  publishTask(where: {tugas: $publish}) {
    tugas
  }
}
`
export const DELETE_TASK = gql`
mutation MyMutation($tugas: String = "") {
  deleteTask(where: {tugas: $tugas}) {
    tugas
  }
}
`