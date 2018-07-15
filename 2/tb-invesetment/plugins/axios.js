import axios from 'axios'
// import router from '../router'
import Vue from 'vue'
// setTimeout(() => {
// if( window.localStorage.getItem("baseurl")){
// axios.defaults.baseURL = window.localStorage.getItem("baseurl"); //测试用
// }else{
axios.defaults.baseURL = 'http://test.vestleader.com:2222/vestLeader'; //测试用
// }
// }, 1000);



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.withCredentials=true;
// 不需要token的rest url
let urlsWithoutToken = new Array();
urlsWithoutToken.push("/userLogToken/getTokenId")



// axios拦截器  token过期之后的处理
axios.interceptors.request.use(
  config => { // 这里的config包含每次请求的内容
    if (window.localStorage.getItem("baseurl")) {
      config.baseURL = window.localStorage.getItem("baseurl"); //测试用
    }
    let url;
    if (config.url.indexOf("?") < 0) {
      url = config.url.substring(axios.defaults.baseURL.length);
    } else {
      url = config.url.substring(axios.defaults.baseURL.length, config.url.indexOf("?"));
    }
    // 需要带上token
    if (urlsWithoutToken.indexOf(url) < 0 && localStorage.getItem("token")) {
      var token, userinfo = localStorage.getItem("userinfo");
      try {  // 刷新后 getTokenId 取得还是登录前的旧 token，所以从登录后的 userinfo.token 中取
        userinfo = JSON.parse(userinfo);
        token = userinfo.token
      } catch (err) {
        token = localStorage.getItem("token");
      }
      config.headers.Authorization = token;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    //在这里对返回的数据进行处理
    return res;
  }, (err) => {
    //Do something with response error
    // if (err.response.data.status == '401') {
    //   window.localStorage.removeItem("token");
    //   window.localStorage.removeItem("userId");
    //   window.localStorage.removeItem("name");
    //   window.localStorage.removeItem("role");
    //   router.push("/");

    // }else if(err.response.data.status=='403'){
    //   window.vm.$message("您没有权限进行此操作");
    // }




    //   // window.location.href =window.location.origin+'/#/login/login/?redirect='+window.location.hash;



    // }
    return Promise.reject(err);
  });

// window.vm = new Vue({

// })

export default axios;
