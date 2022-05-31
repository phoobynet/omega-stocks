import '@/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/routes/router'
import App from '@/App.vue'
import { options } from '@phoobynet/alpaca-fluent'
import { calendarRepository } from '@/libs/calendarRepository'
import { assetRepository } from '@/libs/assetRepository'

type Env = {
  key: string
  secret: string
}

window.ipcRenderer
  .invoke('env')
  .then((env: Env) => {
    options.set({
      ...env,
      calendarRepository,
      assetRepository,
    })
  })
  .then(start)

function start() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}
