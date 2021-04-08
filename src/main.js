import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
// 引入elementui
import ElementUI from 'element-ui';
// socket 连接参数
const socketOptions = {
  autoConnect: false,   
}
// 注册
Vue.use(
  new VueSocketIO({
    debug: true ,   // debug调试，生产建议关闭
    connection: SocketIO("192.168.1.51:8084/webSocket/v1/webSocketServer/", socketOptions),
    store,          // 如果没有使用到store可以不用写
  })
)

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css'
import '@/assets/css/changElement.css'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  sockets: {
    connecting() {
      console.log('正在连接')
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      cosnole.log('连接失败')
    },
    connect() {
      console.log('socket connected')
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
