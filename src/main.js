import Vue from 'vue'
import App from './App'

import store from '@/vuex/store'
// const  QQMapWX=require('@/common/jsdk/qqmap-wx-jssdk.js');
// Vue.use(QQMapWX)

//  兼容 vue  push replace 写法
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)
// import './common/stylus/base.styl'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
