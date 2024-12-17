import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'
import { getCategoryAPI } from './apis/testAPI'
// 全局指令注册
import {lazyPlugin} from "@/directives";
// 引入全局组件插件
import { componentPlugin } from './components'




const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(createPinia())
app.use(router)
// 懒加载
app.use(lazyPlugin)

app.use(componentPlugin)

app.use(pinia)

// getCategoryAPI().then(res=>{
//     console.log(res);
// })

app.mount('#app')
