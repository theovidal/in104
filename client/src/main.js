import './assets/main.css'
import dayjs from 'dayjs'
import localisedFormat from 'dayjs/plugin/localizedFormat'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

dayjs.extend(localisedFormat)
dayjs.locale('fr')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
