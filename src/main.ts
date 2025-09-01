import { createApp } from 'vue'
import App from './App.vue'
import { vAutoFocus } from './directives'
import './assets/base.css'

const app = createApp(App)

// Register custom directives
app.directive('auto-focus', vAutoFocus)

app.mount('#app')
