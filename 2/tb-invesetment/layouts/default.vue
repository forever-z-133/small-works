<template>
  	<el-container>
      <div><input v-model="baseurl" placeholder="baseurl"><button @click="submit">提交</button></div>
			<el-header><Header></Header></el-header>
			<el-main style="padding: 0;"><nuxt/></el-main>
			<el-footer height="364"><Footer></Footer></el-footer>
		</el-container>
</template>

<style  lang="less">
@import "../assets/css/common";

</style>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import $axios from "../plugins/axios.js";

import defaultImage from '../assets/images/default_image.jpg';

export default {
   components: {
    Header,
    Footer
  },
  data(){
     return {
      baseurl: ""
    };
  },
  created(){
     $axios({
        method: "post",
        url: "/userLogToken/getTokenId"
      })
        .then(res => {
          console.log(res)
          if(res.data.code=='0'){
            window.localStorage.setItem("token",res.data.data)
          }
        })
        .catch(err => {
          console.log(err);
        });
    
  },
  head() {
      return { title: '头豹 | 专业寻找投融资' }
  },
  mounted() {
    this.initImageError(defaultImage);
  },
  methods: {
    submit: function() {
      window.localStorage.setItem("baseurl", this.baseurl);
    },
    initImageError (defaultImage) {
      // 图片 onerror 时运行的方法
      var imageError = function (img) {
        img.setAttribute('data-src', img.src);
        img.src = defaultImage;
      }

      // 处理报错图片也失效的死循环
      var img = new Image();
      img.src = defaultImage;
      img.onerror = function() {
        imageError = null
      }

      // 事件代理监听所有 img 的 onerror 事件
      document.addEventListener("error", function (e) {
        var target  = e.target;
        while(target !== this){
          if(target.tagName.toLowerCase() == 'img'){
            imageError && imageError(target);
            break;
          }
          target = target.parentNode;
        }
      }, true);
    }
  }
}
</script>

