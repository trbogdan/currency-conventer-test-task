import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { router } from './router'

const app = createApp(App)

app
  .use(VueQueryPlugin)
  .use(router)
  .mount(document.body)
