
// Import global styles
import './assets/css/main.css'

// Import Vue core and Pinia for state management
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// Create Vue application instance
const app = createApp(App)

// Register Pinia plugin for global state management
app.use(createPinia())

// Mount the app to the DOM element with id 'app'
app.mount('#app')
