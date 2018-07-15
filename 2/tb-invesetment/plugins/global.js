
import Vue from 'vue'

var imgbaseurl= {
  install(Vue){
      Vue.prototype.imgbaseurl= "https://vestleo.oss-cn-shanghai.aliyuncs.com/"
  }
}

Vue.use(imgbaseurl);
