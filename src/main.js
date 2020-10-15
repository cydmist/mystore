import Vue from 'vue'
import App from './App'
import router from './router'

// 引入reset
import "./assets/css/reset.css"
//过滤器
import "./filters"
//公共组件
import "./components"
//vuex
import store from "./store"
//
import "axios"
//引入饿了吗
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
