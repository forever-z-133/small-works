<template>
  <div class="fillcontain">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></el-col>
      <el-col :xs="15" :sm="15" :md="12" :lg="12" :xl="12" id="newslist">

        <div v-if="type==2" class="gallery">
          <div class="item" v-for="(item,index) in imgs" :key="index" @click="reportdetail(item.id)">
            <img :src="imgbaseurl+item.imageUrl">
          </div>
        </div>
        <div v-else class="newslist ">
          <div v-for="(item,index) in newsitem" :key="index">
            <Newsitem source="search" v-bind:newsitem='item.object' :userLogBrowse='userLogBrowse' :type='newstype'></Newsitem>
          </div>

        </div>
        <div class="nomore">
          <span v-if="nomore">没有更多了</span>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :xs="8" :sm="8" :md="5" :lg="5" :xl="5"></el-col>
      <el-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></el-col>
    </el-row>
  </div>
</template>

<script>
import Newsitem from "../components/Newsitem.vue";
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
      pause: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    Newsitem
  },
  created() {
    // console.log(this.type);
    if (this.type == 0) {
      //搜文章
      this.searcharticle();
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
      if (this.type == 0) {
        //搜文章
        this.searcharticle();
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
    searcharticle() {
      $axios({
        method: "get",
        url: "/cmsArticle/search/" + this.pageNum + "/" + this.key
      })
        .then(res => {
          console.log(res);
          if (res.data.code == "0") {
            this.userLogBrowse.id = res.data.data.logId;
            this.userLogBrowse.turn++;
            console.log(
              res.data.data.pageInfo.resultList.length,
              res.data.data.pageInfo.pageSize
            );
            if (
              res.data.data.pageInfo.resultList.length <
              res.data.data.pageInfo.pageSize
            ) {
              this.nomore = true;
              this.busy = false;
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
              res.data.data.pageInfo.pageSize
            ) {
              this.nomore = true;
              this.busy = false;
              console.log("不要");
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
              res.data.data.pageInfo.pageSize
            ) {
              this.nomore = true;
              this.busy = false;
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
}
.nomore span {
  border: 1px solid #e83929;
  border-radius: 4px;
  font-size: 16px;
  color: #e83929;
  padding: 10px 24px;
}
</style>
