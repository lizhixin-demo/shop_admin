import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "@/assets/style/global.less"

//配置axios
import axios from 'axios'
axios.defaults.baseURL ="http://127.0.0.1:8888/api/private/v1/"

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
    // console.log(config);
    return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
