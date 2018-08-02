<template>
  <div class="fillcontain">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="0" :sm="0" :md="2" :lg="3" :xl="3"></el-col>
      <el-col :xs="15" :sm="15" :md="12" :lg="12" :xl="12" id="newslist" style="min-width: 680px;">

        <div v-if="type==2" class="gallery">
          <div class="item" v-for="(item,index) in imgs" :key="index" @click="reportdetail(item.id)">
            <img :src="imgbaseurl+item.imageUrl">
          </div>
        </div>
        <div v-else class="newslist ">
          <div v-for="(item,index) in newsitem" :key="index">
            <Newsitem :keyword="key"  source="search" v-bind:newsitem='item.object' :userLogBrowse='userLogBrowse' :type='newstype'></Newsitem>
          </div>

        </div>
        <div v-if="nomore" class="nomore">
           <img src="../assets/images/nomore.png">
        </div>
        <div v-if="listloading" class="listloading" >
           <img src="../assets/images/loading.gif">
        </div>
         <div  v-if="noresult" class="noresult">
          <img src="../assets/images/noresult.png">
        </div>
      </el-col>
      <el-col :span="1" style="min-width:30px;"></el-col>
      <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5" style="min-width: 280px;">
        <NewNewsList v-if="newnews&&type!=='2'" title="热门文章" v-bind:newnews='newnews'></NewNewsList>

      </el-col>
      <el-col :xs="0" :sm="0" :md="1" :lg="3" :xl="3"></el-col>
    </el-row>
    <FooView></FooView>
  </div>
</template>

<script>
import Newsitem from "../components/Newsitem.vue";
import NewNewsList from "../components/NewNewsList.vue";
import FooView from "../components/FooView.vue";
import $axios from "../plugins/axios.js";
export default {
  data() {
    return {
      newsitem: [],
      imgs: [],
      busy: true,
      type: this.$route.query.type,
      pageNum: 1,
      key: this.$route.query.search,
      nomore: false,
      newstype: 1,
      userLogBrowse: {
        id: "",
        click: 0,
        turn: 0,
        completeness: 0
      },
      pause: true,
      noresult: false,
      listloading: true,
      newnews: []
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    Newsitem,
    NewNewsList,
    FooView
  },
  created() {
    // console.log(this.type);
    this.gethotArticles();
    if (this.type == 0) {
      //搜文章
      this.searcharticle();
      this.newstype=1;
    } else if (this.type == 1) {
      this.searchrepote();
      this.newstype = 6;
      //搜报告
    } else if (this.type == 2) {
      //搜图表
      this.illsearch();
    }
  },
  watch: {
    $route() {
      this.key = this.$route.query.search;
      this.type = this.$route.query.type;
      this.pageNum = 1;
      this.busy = true;
      this.newsitem = [];
      this.noresult = false;
      this.nomore = false;
      this.gethotArticles();
      if (this.type == 0) {
        //搜文章
        this.searcharticle();
        this.newstype=1;
      } else if (this.type == 1) {
        this.searchrepote();
        this.newstype = 6;
        //搜报告
      } else if (this.type == 2) {
        //搜图表
        this.illsearch();
      }
    }
  },
  methods: {
    // 获取热门文章
    gethotArticles() {
      $axios({
        method: "get",
        url: "/cmsArticle/hotArticles"
      })
        .then(res => {
          if (res.data.code == "0") {
            console.log(res);
            if (res.data.data) {
              this.newnews = res.data.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searcharticle() {
      $axios({
        method: "get",
        url: "/cmsArticle/search/" + this.pageNum + "/" + this.key
      })
        .then(res => {
          if (res.data.code == "0") {
            this.userLogBrowse.id = res.data.data.logId;
            this.userLogBrowse.turn++;
            if (
              res.data.data.pageInfo.resultList.length <
                res.data.data.pageInfo.pageSize &&
              res.data.data.pageInfo.resultList.length > 0
            ) {
              this.nomore = true;
              this.busy = false;
              this.listloading = false;
            } else if (
              res.data.data.pageInfo.resultList.length == 0 &&
              res.data.data.pageInfo.total == 0
            ) {
              this.noresult = true;
              this.listloading = false;
            }
            this.newsitem = this.newsitem.concat(
              res.data.data.pageInfo.resultList
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchrepote() {
      $axios({
        method: "get",
        url: "/report/search/" + this.pageNum + "/" + this.key
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "0") {
            this.userLogBrowse.id = res.data.data.logId;
            this.userLogBrowse.turn++;
            if (
              res.data.data.pageInfo.resultList.length <
                res.data.data.pageInfo.pageSize &&
              res.data.data.pageInfo.resultList.length > 0
            ) {
              this.nomore = true;
              this.busy = false;
              this.listloading = false;
              console.log("不要");
            } else if (
              res.data.data.pageInfo.resultList.length == 0 &&
              res.data.data.pageInfo.total == 0
            ) {
              this.noresult = true;
              this.listloading = false;
            }
            this.newsitem = this.newsitem.concat(
              res.data.data.pageInfo.resultList
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    illsearch() {
      $axios({
        method: "get",
        url: "/report/ills/search/" + this.pageNum + "/" + this.key
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "0") {
            this.userLogBrowse.id = res.data.data.logId;
            this.userLogBrowse.turn++;
            if (
              res.data.data.pageInfo.resultList.length <
                res.data.data.pageInfo.pageSize &&
              res.data.data.pageInfo.resultList.length > 0
            ) {
              this.nomore = true;
              this.busy = false;
              this.listloading = false;
            } else if (
              res.data.data.pageInfo.resultList.length == 0 &&
              res.data.data.pageInfo.total == 0
            ) {
              this.noresult = true;
              this.listloading = false;
            }
            this.imgs = this.imgs.concat(res.data.data.pageInfo.resultList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    reportdetail(i) {
      this.userLogBrowse.click++;
      this.updateuserLogSearch();
      const { href } = this.$router.resolve({
        name: "reportDetail",
        query: { id: i }
      });
      window.open(href, "_blank");
    },
    // 滚动绑定事件
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //判断是否到底部
      // console.log(window.screen.height, scrollTop, document.body.clientHeight);
      if (
        window.screen.height + scrollTop + 1000 > document.body.clientHeight &&
        this.busy
      ) {
        // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
        console.log("到底部");
        this.loadMore();
      }
      if (this.pause) {
        this.pause = false;
        this.userLogBrowse.completeness =
          scrollTop / (document.querySelector("#newslist").clientHeight - 364);
        this.updateuserLogSearch();
        setTimeout(() => {
          this.pause = true;
        }, 30000);
      }
    },
    // 存用户埋点
    updateuserLogSearch() {
      $axios({
        method: "POST",
        url: "/userLogSearch/update",
        data: this.userLogBrowse
      });
    },
    // 加载更多
    loadMore() {
      console.log("加载");
      this.busy = false;
      setTimeout(() => {
        this.pageNum++;
        this.busy = true;
        this.searcharticle(this.pageNum);
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.fillcontain {
  padding: 45px 0;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
}
.item {
  flex-grow: 1;
  height: 200px;
  margin: 5px;
}
.item img {
  height: 100%;
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  display: block;
}
.nomore {
  display: flex;
  justify-content: center;
  padding: 60px 0 100px 0;
}
.nomore span {
  // border: 1px solid #e83929;
  // border-radius: 4px;
  // font-size: 16px;
  // color: #e83929;
  // padding: 10px 24px;
}
.noresult {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
}
.noresult img {
  padding: 140px 0;
}
.listloading {
  display: flex;
  justify-content: center;
  padding: 30px 0 0 0;
  img {
    width: 130px;
    height: 100px;
  }
}
</style>
