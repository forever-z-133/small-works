<template>
  <div class="header">
    <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="3"></el-col>
    <el-col :span="12" style="display:flex;align-items:center;min-width: 680px;">
      <el-col :span="4">
        <div class="companyicon"><img src="../assets/logo.png"></div>
      </el-col>
      <el-col :span="14">
        <div style="margin-left:2.9%;    position: relative;">
          <el-input v-model="searchword" placeholder="搜索你感兴趣的内容…" @keyup.enter.native="loginSubmit" @blur="searchBlur" @focus="searchFocus">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick">
            </i>
          </el-input>
          <div v-if="modal" class="modal">
            <div v-if="history.length>0" class="search_history">
              <div class="history_ul">
                <div class="history_li" v-for="(item,index) in history" v-bind:key="index" @click="gosearch(item)">{{item}}</div>
              </div>
            </div>
            <div class="search_hot">
              <div class="hot_ul">
                <div class="hot_li" v-for="(item,index) in hot" v-bind:key="index" @click="gosearch(item)">{{item}}<img v-if="index<=2" :src="require(`../assets/images/hot${index+1}.png`)"></div>
              </div>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :span="6" style="position:relative;display:flex;justify-content:flex-end;padding:0 20px">
        <div class="screen" @click="isChoose">
          <span class="screen_word">{{activescreen}}</span>
          <span :class="IschooseScreen?'top':'bottom'"></span>
        </div>
        <div v-if="IschooseScreen" class="screen_list">
          <div v-for="(item,index) in screenList" v-bind:key="index" :data-id="index" @click="chooseScreen" class="screen_item">
            {{item}}
          </div>

        </div>
      </el-col>

    </el-col>

    <el-col :span="6" style="min-width: 280px;display:flex;align-items: center;justify-content: flex-end;">
      <div class="iconlist">
        <div class="iconitem" @click="activeid=1" :class="activeid==1?'iconitem_active':''">
          <nuxt-link :to="{name:'index'}">
            <img v-if="activeid==1" src="../assets/main.png">
            <img v-else src="../assets/main_gray.png">
            <p>首页</p>
          </nuxt-link>
        </div>
        <div class="iconitem" v-if="!$store.state.islogin" @click="activeid=2" :class="activeid==2?'iconitem_active':''">
          <nuxt-link :to="{name:'login'}">
            <img v-if="activeid==2" src="../assets/register_gray.png">
            <img v-else src="../assets/register.png">
            <p>登录</p>
          </nuxt-link>
        </div>
        <div class="iconitem" v-if="!$store.state.islogin" @click="activeid=3" :class="activeid==3?'iconitem_active':''">
          <nuxt-link :to="{name:'signin'}">
            <img v-if="activeid==3" src="../assets/login_gray.png">
            <img v-else src="../assets/login.png">
            <p>注册</p>
          </nuxt-link>
        </div>
        <div class="userinfo" v-if="$store.state.islogin" @click="showUser">
          <img class="userinfoimg" src="../assets/userCenter/head-default.png">
        </div>
        <div v-if="Isshowuser" class="screen_list user_message">
          <div class="screen_item">
            <img src="../assets/userCenter/head-default.png">
            <span v-if="userinfo.name">{{userinfo.name}}</span>
             <span v-else>{{userinfo.mobileno}}</span>
          </div>
          <div class="screen_item">
            <nuxt-link :to="{name:'userCenter'}">
              <span>个人中心</span>
            </nuxt-link>
          </div>
          <div class="screen_item" @click="signout">
            <span >退出</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>
<style>
.el-header {
  padding: 0 !important;
    box-shadow: 0 4px 8px 0 rgba(51, 51, 51, 0.12);
}
</style>

<style  lang="less" scoped>
.header {
  width: 100%;
  // height: 100%;
  // background: #ffffff;
  // box-shadow: 0 4px 8px 0 rgba(51, 51, 51, 0.12);
  // padding: 13px 0 0 0;
  // display: flex;
  // align-items: center;
}
.iconlist {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .iconitem {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 0 0 0 60px;
    a {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    p {
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: #333333;
    }
  }
  .iconitem_active {
    p {
      color: #e83929;
    }
  }
  .userinfo {
    margin: 0 0 0 60px;
    width: 42px;
    height: 42px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
}
.modal {
  background: #ffffff;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  z-index: 400;
  position: absolute;
  width: 100%;
  top: 55px;
  .search_history {
    padding: 16px 16px 0 16px;
    .history_ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0 15px 0;
      border-bottom: 1px solid #e9e9e9;
    }
    .history_li {
      font-size: 12px;
      color: #918989;
      padding: 6px 18px;
      border: 1px solid #ebebeb;
      border-radius: 100px;
      margin: 0 12px 6px 0;
      cursor: pointer;
    }
    .history_li:active,
    .history_li:hover {
      background: #e83929;
      color: white;
    }
  }
  .search_hot {
    font-size: 14px;
    color: #211e1e;
    .hot_li {
      padding: 6px 16px;
      cursor: pointer;
      img{
        margin: 0 0 0 10px;
      }
    }
    .hot_li:active,
    .hot_li:hover {
      background: #f4f4f4;
    }
  }
}
.screen {
  border: 1px solid #dc2525;
  border-radius: 100px;
  padding: 11px 20px;
  display: flex;
  justify-content: center;
  color: #dc2525;
  // max-width: 142px;
  width: 100%;
  align-items: center;
  cursor: pointer;
  .screen_word {
    margin: 0 5px 0 0;
  }
  .top {
    width: 0;
    height: 0;
    border-width: 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent #e83929; /*透明 透明  灰*/
  }
  .bottom {
    width: 0;
    height: 0;
    border-width: 6px 6px 0;
    border-style: solid;
    border-color: #e83929 transparent transparent; /*灰 透明 透明 */
  }
}
.screen_list {
  background: #ffffff;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  position: absolute;
    max-width: 130px;
    width: 50%;
  padding: 0 26px;
  z-index: 100;
  top: 60px;
  .screen_item {
    font-size: 14px;
    color: #211e1e;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    a {
      color: #211e1e;
    }
  }
}
.user_message {
  top: 62px;
  .screen_item {
    justify-content: flex-start;
    img {
      width: 24px;
      height: 24px;
      margin: 0 4px 0 0;
    }
  }
}
</style>
<script>
import $axios from "../plugins/axios.js";
export default {
  data() {
    return {
      restaurants: [],
      searchword: "",
      modal: false,
      IschooseScreen: false,
      history: [],
      hot: [],
      screenList: ["文章", "报告", "图表"],
      activescreen: "文章",
      Isshowuser: false,
     
      type: 0,
      userinfo: {}
    };
  },
  computed:{
  	 activeid(){
  	 	let path = this.$route.path
  	 	if(path == "/"){
  	 		return 1
  	 	}else if(path == "/login"){
  	 		return 2
  	 	}else if(path == "/signin"){
  	 		return 3
  	 	} else {
  	 		return 1
  	 	}
  	 },
  },
  created() {
    this.getUserHotwordsystem(); //获取热词
    this.getUserHotworduser(); //获取历史搜索记录
  },
	
  methods: {
    //获取热词
    getUserHotwordsystem() {
      $axios({
        method: "get",
        url: "/sysHotwords/getUserHotword/system"
      })
        .then(res => {
          if (res.data.code == "0") {
            this.hot = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取搜索记录
    getUserHotworduser() {
      $axios({
        method: "get",
        url: "/sysHotwords/getUserHotword/user"
      })
        .then(res => {
          if (res.data.code == "0") {
            this.history = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //点击icon前往搜索
    handleIconClick(ev) {
      if (this.searchword) {
        this.$router.push({
          name: "search",
          query: { search: this.searchword, type: this.type }
        });
      }
    },
    loginSubmit() {
      if (this.searchword) {
        this.$router.push({
          name: "search",
          query: { search: this.searchword, type: this.type }
        });
        this.modal = false;
      }
    },
    //input获取焦点
    searchFocus() {
      this.modal = true;
      this.getUserHotwordsystem(); //获取热词
      this.getUserHotworduser(); //获取历史搜索记录
    },
    //input失去焦点
    searchBlur() {
      setTimeout(() => {
        this.modal = false;
      }, 500);
    },
    //选择筛选
    chooseScreen(e) {
      // console.log(e);
      this.activescreen = this.screenList[e.target.dataset.id];
      this.type = e.target.dataset.id;
      this.IschooseScreen = false;
    },
    //选择筛选
    isChoose() {
      this.IschooseScreen = !this.IschooseScreen;
    },
    //点击头像
    showUser() {
      this.Isshowuser = true;
      var i = window.localStorage.getItem("userinfo");
      this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      var myphone = this.userinfo.mobileno.substr(3, 4);
      this.userinfo.mobileno= this.userinfo.mobileno.replace(myphone, "****");
      setTimeout(() => {
        this.Isshowuser = false;
      }, 3000);
    },
    // 去搜索
    gosearch(i) {
      console.log(i);
      this.searchword = i;
      this.$router.push({
        name: "search",
        query: { search: i, type: this.type }
      });
    },
    //登出
    signout() {
    	let path = this.$route.path
      this.Isshowuser = false;
      window.localStorage.removeItem("userinfo");
      window.localStorage.removeItem("telphone");
      window.localStorage.removeItem("username");
      this.$store.commit("setLogin", false);
       $axios({
        method: "post",
        url: "/userLogToken/getTokenId"
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "0") {
            window.localStorage.setItem("token", res.data.data);
            if(path == "/"){
            	 window.location.reload();
            } else {
            	this.$router.replace("/")
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    var i = window.localStorage.getItem("userinfo");
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    // console.log(i)
    if (this.userinfo) {
      this.$store.commit("setLogin", true);
    } else {
      this.$store.commit("setLogin", false);
    }
    document.addEventListener("click", e => {
      if (
        e.target._prevClass !== "screen" &&
        e.target._prevClass !== "screen_word"
      ) {
        this.IschooseScreen = false;
      }
      // console.log(e.target._prevClass)
      if(e.target._prevClass!=='userinfoimg'){
         this.Isshowuser = false;
      }
    });
  }
};
</script>