import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

// import './assets/main.css'
import "@/assets/tailwind.css"
// v-calendar
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPen, faTrash)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

// app.use(router)
app.use(VCalendar, {})

app.mount('#app')
