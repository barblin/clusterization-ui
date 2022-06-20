import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { store } from './store/application-state-store'

library.add(faHome)
library.add(faTools)

const app = createApp(App)

app.config.productionTip = false
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
