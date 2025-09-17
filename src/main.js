import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import './index.css'

import App from './App.vue'
import router from './router/index.js'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'


const i18n = createI18n({
    legacy: false, // recommandé avec Vue 3 + Composition API
    locale: 'fr',  // langue par défaut
    fallbackLocale: 'en',
    messages:{fr,en}
})


const app = createApp(App)
app.use(i18n)

app.use(createPinia())
app.use(router)

app.mount('#app')
