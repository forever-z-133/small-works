// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueScroller from 'vue-scroller'


Vue.use(VueScroller)

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.prototype.$axios = axios
// Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

