//自定义全局组件的入口文件

import KSwitch from './KSwitch/index.vue'
import KProgress from './KProgress/index.vue'
// import KProgress from "./KProgress/index_1.vue"
import KButton from './KButton/index.vue'
// import KDivider from './KDivider/index.vue'
import KDivider from './KDivider/index_1.vue'
import KRadio from './KRadio/index.vue'
import KCheckbox from './KCheckbox/index.vue'
import KInput from './KInput/index.vue'
import KIcon from './KIcon/index.vue'

export default {
    install:( app ) => {
        app.component('k-switch', KSwitch)
        app.component( 'k-progress', KProgress)
        app.component('k-button', KButton)
        app.component('k-divider', KDivider)
        app.component('k-radio', KRadio)
        app.component('k-checkbox', KCheckbox)
        app.component('k-input', KInput)
        app.component('k-icon', KIcon)
    }
}