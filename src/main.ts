
// Import global styles
import './assets/css/main.css'

// Import Vue core, Pinia, and Router for state management and navigation
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Create Vue application instance
const app = createApp(App)

// Register Pinia plugin for global state management
app.use(createPinia())

// Register Vue Router for SPA navigation
app.use(router)

// Mount the app to the DOM element with id 'app'
app.mount('#app')
