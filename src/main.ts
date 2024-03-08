import { createApp } from 'vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'
import permission from './permission'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// console.log(import.meta.env)

const app = createApp(App)

app.use(globalComponent)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.use(router)

import './permission'
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
