import Vue from "vue"
import App from "./App.vue"
import Home from "./pages/Home.vue"
import List from "./pages/List.vue"
import ScheduleAdd from "./pages/ScheduleAdd.vue"
import ScheduleList from "./pages/ScheduleList.vue"
import DailyLife from "./pages/DailyLife.vue"
import VueRouter from "vue-router"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(VueRouter) //挂载属性
Vue.use(ElementUI)

Vue.config.productionTip = false
//创建路由对象并配置路由规则
let router = new VueRouter({
  routes: [
    { path: "/home", component: Home },
    { path: "/list", component: List },
    { path: "/schedule/add/:id?", component: ScheduleAdd },
    { path: "/schedule/list", component: ScheduleList },
    { path: "/dailylife/list", component: DailyLife }
  ]
})

new Vue({
  render: h => h(App),
  router: router //可以简写router
}).$mount("#app")
