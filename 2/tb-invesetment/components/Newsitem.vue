<template>
  <div class="newsitem">
    <div class="newsitemlink"  @click="linkto(newsitem.articletype,newsitem.id)">
      <div class="newsimg">
        <img :src="imgbaseurl+newsitem.images">
        <span v-if="type==6">{{newsitem.industry|industry}}</span>
        <span v-else-if="newsitem.industries&&newsitem.industries.length>0">{{newsitem.industries[0].name}}</span>
      </div>
      <div class="newsmessage">
        <div class="title">
          <p >{{newsitem.title}}</p>
          <p v-if="type==6">{{newsitem.newsitem}}</p>
          <p v-else>{{newsitem.contentExcludeHtml}}</p>
        </div>

        <div class="specific">
          
          <span class="recommend">{{ newsitem.articletype | capitalize }}</span>
          <span class="author" v-if="type!==6">沙利文 · &nbsp;</span>
          <span class="author" v-if="type==6">沙利文 · &nbsp;</span>
          <span class="time"  v-if="type==6">{{newsitem.createdAt|time}}</span>
          <span class="time" v-else>{{newsitem.createdat|time}}</span>
          <!-- <span class="comment"><img src="../assets/comment.png">999 + 评论</span> -->
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.newsitem {
  border-top: 1px solid #e7e8eb;
  padding: 20px 0;
}
.newsitem .newsitemlink {
  display: flex;
  color: #333;
}
.newsimg span {
  background: url(../assets/tag.png) no-repeat;
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  margin: 0px 0px 0 -280px;
  padding: 5px 8px;
  display: inline-block;
  z-index: 1;
  background-size: 100% 100%;
}

.newsimg img {
  width: 278px;
  height: 162px;
  padding: 0 20px 0 0;
}
.title {
  p:nth-child(1) {
    font-size: 20px;
    color: #504646;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 52px;
  }
  p:nth-child(2) {
    font-size: 14px;
    color: #918989;
    margin: 8px 0 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 40px;
  }
}
.newsmessage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.specific {
  justify-self: end;
  font-size: 12px;
  color: #999999;
  display: flex;
  align-items: center;
}
.recommend {
  border: 1px solid #e83929;
  font-size: 10px;
  color: #e83929;
  padding: 1px 6px;
  border-radius: 4px;
  margin: 0 10px 0 0;
}
.comment {
  margin: 0 0 0 53px;
  img {
    margin: 0 6px 0 0;
  }
}
</style>
<script>
import utils from "../plugins/utils.js";
import $axios from "../plugins/axios.js";
export default {
  data() {
    return {};
  },
  props: {
    newsitem: {
      type: Object,
      required: true
    },
    type: {
      type: Number,
      required: false
    },
    source: {
      type: String,
      required: false
    },
    userLogBrowse: {
      type: Object,
      required: false
    }
  },
  methods: {
    articletype(e) {
      console.log(e);
    },
    linkto(e, i) {
      this.userLogBrowse.click++;
      this.updateuserlogBrowse();
      if (e == 1) {
        const { href } = this.$router.resolve({
          name: "articleDetail",
          query: { id: i }
        });
        window.open(href, "_blank");
      } else if (e == 2) {
        const { href } = this.$router.resolve({
          name: "questionDetail",
          query: { id: i }
        });
        window.open(href, "_blank");
      } else if (e == 3) {
        //公司todo
        const { href } = this.$router.resolve({
          name: "articleDetail",
          query: { id: i }
        });
        window.open(href, "_blank");
      } else if (e == 4) {
        const { href } = this.$router.resolve({
          name: "articleDetail",
          query: { id: i }
        });
        window.open(href, "_blank");
      } else if (e == 5) {
        if (this.source == "normal") {
          const { href } = this.$router.resolve({
            name: "pictureDetail",
            query: { id: i, type: "normal" }
          });
          window.open(href, "_blank");
        }

        if (this.source == "search") {
          const { href } = this.$router.resolve({
            name: "pictureDetail",
            query: { id: i, type: "search" }
          });
          window.open(href, "_blank");
        }
      } else {
        const { href } = this.$router.resolve({
          name: "reportDetail",
          query: { id: i }
        });
        window.open(href, "_blank");
      }
    },
    updateuserlogBrowse() {
      if (this.newstype == "search") {
        $axios({
          method: "POST",
          url: "/userLogSearch/update",
          data: this.userLogBrowse
        })
          .then(res => {
            if (res.data.code == "0") {
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        $axios({
          method: "POST",
          url: "/userLogBrowse/update",
          data: this.userLogBrowse
        })
          .then(res => {
            if (res.data.code == "0") {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  filters: {
    capitalize: function(value) {
      var type;
      if (!value) return "报告";
      if (value == 1) {
        type = "新闻";
      } else if (value == 2) {
        type = "问答";
      } else if (value == 3) {
        type = "公司";
      } else if (value == 4) {
        type = "需求";
      } else if (value == 5) {
        type = "图说";
      } else {
        type = "报告";
      }
      return type;
    },
    time: function(value) {
      var time = utils.publishTime(value);
      return time;
    },
    industry: function(value) {
      if (!value) {
        return "";
      } else {
        var arr = value[0].split("/");
        return arr[0];
      }
    }
  },
  mounted() {}
};
</script>