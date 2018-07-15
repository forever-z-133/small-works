<template>
  <div class="fillcontain">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></el-col>
      <el-col :xs="15" :sm="15" :md="12" :lg="12" :xl="12">
        <el-carousel id="swiper" :interval="5000" arrow="never" :autoplay="autoplay" ref="carousel" :height="carouselheight" style="" :style="{'height':carouselheight}">
          <el-carousel-item v-for="(item,index) in slide" v-if="slide" :key="index" :style="{'height':carouselheight}">
            <a :href="item.link">
              <img ref="carouselimg" :style="{'height':carouselheight}" class="carousel_img" @load="carouselload" :src="imgbaseurl+item.imageurl">
              <p class="carousel_word">{{item.title}}</p>
            </a>
          </el-carousel-item>
          <div class="arrow" :style="{'height':carouselheight}">
            <img @click="prevCarousel" src="../assets/images/arrowleft.png">
            <img @click="nextCarousel" src="../assets/images/arrowright.png">
          </div>
        </el-carousel>
        <el-row type="flex" class="row-bg title" :class="isTop==true?'mainnavigation':'mainnavigation1'" :style="{'width':clientWidth,'top':maintop}" justify="center" id="mainnavigation">
          <el-col :span="12">
            <div class="index_title">
              <span v-for="(item,index) in navigitor" :key="index" @click="choosecategorie(index)" :class="activeid==index?'active':''">{{item}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="index_action">
              <div class="index_action_item" @click="questionDialog()">
                <img src="../assets/feedback_fill.png">
                <span>发起提问</span>

              </div>
              <div class="index_action_item">
                <nuxt-link :to="{name:'financingInput'}">
                  <img src="../assets/systemprompt_fill.png">
                  <span>找融资</span>
                </nuxt-link>

              </div>
              <div class="index_action_item">
                <nuxt-link :to="{name:'investmentInput'}">
                  <img src="../assets/browse_fill.png">
                  <span>招标的</span>
                </nuxt-link>

              </div>
            </div>
          </el-col>
        </el-row>
        <div class="newslist" id="newslist">
          <div v-for="(item,index) in newsitem" v-if="newsitem" :key="index">
            <Newsitem source="normal" :type='type' :userLogBrowse='userLogBrowse' v-bind:newsitem='item'></Newsitem>
          </div>
          <div class="nomore">
            <span v-if="nomore">没有更多了</span>
          </div>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5">
        <Question v-if="todayQa" title="今日问答" v-bind:todayQa='todayQa'></Question>
        <NewNewsList v-if="newnews" title="热门文章" v-bind:newnews='newnews'></NewNewsList>

      </el-col>
      <el-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></el-col>
    </el-row>
    <QuestionInputDialog :visible.sync="visible"></QuestionInputDialog>
  </div>
</template>

<script>
import Newsitem from "../components/Newsitem.vue";
import Question from "../components/Question.vue";
import NewNewsList from "../components/NewNewsList.vue";
import QuestionInputDialog from "../components/QuestionInputDialog.vue";
import $axios from "../plugins/axios.js";
export default {
  data() {
    return {
      isTop: false,
      clientWidth: "921",
      newsitem: [],
      newnews: [],
      interval: 3000,
      autoplay: true,
      carouselheight: "0px",
      busy: true,
      todayQa: {},
      navigitor: ["推荐", "新闻", "报告", "图片", "问答"],
      activeid: 0,
      type: 0,
      pageNum: 1,
      nomore: false,
      visible: false,
      slide: [],
      offsetTop: 0,
      userLogBrowse: {
        id: "",
        click: 0,
        turn: 0,
        completeness: 0
      },
      pause: true,
      maintop: "0px"
    };
  },
  components: {
    Newsitem,
    Question,
    NewNewsList,
    QuestionInputDialog
  },
  created() {
    this.gettodayQa();
    this.gethotArticles();
    this.getarticlesHome();
    this.getswiper();
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    // this.windowHeight = `${document.documentElement.clientHeight}px`;
    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    const that = this;
    window.onresize = function temp() {
      that.clientWidth = `${that.$refs.carouselimg["0"].width}px`;
      that.carouselheight = `${that.$refs.carouselimg["0"].width * 61 / 200}px`;
      // document.querySelector("#mainnavigation").style.top =
      //   `${that.$refs.carouselimg["0"].width * 61 / 200 + 125}` + "px";
      // that.maintop =
      //   `${that.$refs.carouselimg["0"].width * 61 / 200 + 125}` + "px";
      // that.mianna = `${that.$refs.carouselimg["0"].width * 61 / 200 + 125}`;
      console.log("22");
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#mainnavigation").offsetTop;

      if (scrollTop <= this.mianna) {
        offsetTop = that.mianna - Number(scrollTop);
        this.isTop = false;
        document.querySelector("#mainnavigation").style.top = offsetTop + "px";
      } else {
        this.isTop = true;
        document.querySelector("#mainnavigation").style.top = "0px";
      }
    };

    if (/question=true/.test(window.location.href)) {
      this.visible = true;
      var href = window.location.href;
      href = href.replace(/[\?#&]question=true/, "");
      window.history.replaceState({}, "", href);
    }
  },
  methods: {
    // 获取今日问答
    gettodayQa() {
      $axios({
        method: "get",
        url: "/cmsArticle/todayQa"
      })
        .then(res => {
          // console.log(res);
          if (res.data.code == "0") {
            if (res.data.data) {
              this.todayQa = res.data.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取文章列表
    getarticlesHome(i) {
      $axios({
        method: "get",
        url: "/cmsArticle/articlesHome/" + this.pageNum + "/" + this.type
      })
        .then(res => {
          if (res.data.code == "0") {
            
            this.userLogBrowse.id = res.data.data.logId;
            this.userLogBrowse.turn++;
            if (
              res.data.data.pageInfo.resultList.length <
              res.data.data.pageInfo.pageSize
            ) {
              this.nomore = true;
              this.busy = false;
            }else{
              this.busy = true;
            }
            if (res.data.data.pageInfo.resultList) {
              if (i > 1) {
                this.newsitem = this.newsitem.concat(
                  res.data.data.pageInfo.resultList
                );
              } else {
                this.newsitem = res.data.data.pageInfo.resultList;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取热门文章
    gethotArticles() {
      $axios({
        method: "get",
        url: "/cmsArticle/hotArticles"
      })
        .then(res => {
          if (res.data.code == "0") {
            if (res.data.data) {
              this.newnews = res.data.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开弹框
    questionDialog() {
      this.visible = true;
    },
    // 轮播图
    getswiper() {
      $axios({
        method: "get",
        url: "/sysSlide/all"
      })
        .then(res => {
          if (res.data.code == "0") {
            if (res.data.data) {
              this.slide = res.data.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 存用户埋点
    updateuserlogBrowse() {
      $axios({
        method: "POST",
        url: "/userLogBrowse/update",
        data: this.userLogBrowse
      });
    },
    // 滚动绑定事件
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#mainnavigation").offsetTop;
      if (scrollTop <= this.mianna) {
        offsetTop = this.mianna - Number(scrollTop);
        // console.log(offsetTop);
        this.isTop = false;
        document.querySelector("#mainnavigation").style.top = offsetTop + "px";
      } else {
        this.isTop = true;
        document.querySelector("#mainnavigation").style.top = "0px";
      }
      if (this.pause) {
        this.pause = false;
        if (scrollTop > offsetTop) {
          this.userLogBrowse.completeness =
            (scrollTop - document.querySelector("#swiper").clientHeight) /
            document.querySelector("#newslist").clientHeight;
        } else {
          this.userLogBrowse.completeness =
            scrollTop / document.querySelector("#newslist").clientHeight;
        }

        this.updateuserlogBrowse();
        setTimeout(() => {
          this.pause = true;
        }, 30000);
      }

      //判断是否到底部
      if (
        window.screen.height + scrollTop + 1000 > document.body.clientHeight &&
        this.busy
      ) {
        // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
        this.loadMore();
      }
    },
    // 轮播图事件
    prevCarousel() {
      this.autoplay = false;
      this.$refs.carousel.prev();
    },
    // 轮播图事件
    nextCarousel() {
      this.autoplay = false;
      this.$refs.carousel.next();
    },
    // 轮播图加载
    carouselload() {
      this.$nextTick(() => {
        this.carouselheight = `${this.$refs.carouselimg["0"].width *
          61 /
          200}px`;
        this.mianna = `${this.$refs.carouselimg["0"].width * 61 / 200 + 125}`;
        this.maintop =
          `${this.$refs.carouselimg["0"].width * 61 / 200 + 125}` + "px";
        this.clientWidth = `${this.$refs.carouselimg["0"].width}px`;
      });
    },
    //加载更多
    loadMore() {
      console.log("到底");
      this.busy = false;
      setTimeout(() => {
        this.pageNum++;
        this.getarticlesHome(this.pageNum);
      }, 1000);
    },
    //选择分类todo
    choosecategorie(i) {
      this.activeid = i;
      if (i == 3) {
        this.type = 5;
      } else if (i == 4) {
        this.type = 2;
      } else if (i == 2) {
        this.type = 6;
      } else {
        this.type = i;
      }
      this.pageNum = 1;
      this.nomore = false;
      this.busy = true;
      document.body.scrollTop = this.offsetTop;
      document.documentElement.scrollTop = this.offsetTop;
      this.getarticlesHome(1);
    }
  }
};
</script>

<style lang="less" scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 45px 0;
}
.title {
  padding: 20px 0;
}
.index_title {
  display: flex;
  justify-content: space-between;

  span {
    font-size: 20px;
    color: #918989;
  }
  .active {
    color: #e83929;
  }
}
.index_action {
  display: flex;
  justify-content: space-evenly;
  .index_action_item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #918989;
    a {
      color: #918989;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
    img {
      margin: 0 8px 0 0;
    }
  }
}
.arrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  img {
    height: 30px;
    margin: 0 30px;
  }
}

.today_title {
  font-size: 16px;
  color: #211e1e;
  padding: 20px 0;
  border-top: 2px solid #e83929;
  text-align: center;
  border-bottom: 1px dotted #ebe7e7;
}
.nomore {
  display: flex;
  justify-content: center;
}
.nomore span {
  border: 1px solid #e83929;
  border-radius: 4px;
  font-size: 16px;
  color: #e83929;
  padding: 10px 24px;
}
</style>
<style lang="less">
.carousel_word {
  background: rgba(48, 47, 48, 0.7);
  z-index: 10000;
  position: absolute;
  margin: -44px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #ffffff;
  padding: 8px 0;
}
.carousel_img {
  width: 100%;
  height: 100%;
}
.el-carousel__indicators {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 4px;
}
.is-active {
  background: #e83929;
}
.title {
  align-items: center;
}
.el-carousel__indicator {
  width: 100%;
  padding: 0 4px;
}
.el-carousel__button {
  width: 100%;
  background: transparent;
}

.mainnavigation {
  position: fixed;
  top: 0 !important;
  z-index: 99;
  background: hsla(0, 0%, 100%, 0.9);
}
.mainnavigation1 {
  // width: auto;
  // position: relative;
  // left: 0px;
  position: fixed;
  // top: 300;

  z-index: 99;
  background: hsla(0, 0%, 100%, 0.9);
}
.newslist {
  margin-top: 66px;
}
</style>
