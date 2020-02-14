import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'


Vue.config.productionTip = false



import 'lib-flexible'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


// import axios from 'axios'
// Vue.prototype.$axios = axios


import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern ="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
// 禁止页面滚动
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止页面滑动
}
// 允许主页面滚动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
