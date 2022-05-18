import {createAppTarget} from './render'
import App from './App.vue'

import KComponent from "./libs/index.js"

let app = createAppTarget(App)
app.use(KComponent)
app.mount(document.getElementById('app'))
