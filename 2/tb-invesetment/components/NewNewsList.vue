<template>
<div>
      <div class="today_title">
           {{title}}
        </div>
        <div class="new_news">
          <NewNews v-for="(item,index) in newnews" v-bind:newnews='item' v-bind:id='index' v-bind:key='index'></NewNews>
        </div>
        </div>
</template>

<style lang="less" >
.today_title {
  font-size: 16px;
  color: #211e1e;
  padding: 20px 0;
  border-top: 2px solid #e83929;
  text-align: center;
  border-bottom: 1px dotted #ebe7e7;
}
.new_news {
  .newnews:first-child {
    margin-top: 0;
  }
  .newnews:nth-child(1),
  .newnews:nth-child(2) {
    img {
      width: 100%;
    }
    .newsmessage {
      font-size: 16px;
    }
    .title {
      background: rgba(0, 0, 0, 0.4);
      margin: -74px 0 0 0;
      z-index: 100;
      position: absolute;
      color: white;
      text-align: center;
      display: -webkit-box;
      min-height: 44px;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      padding: 14px 0px;
      width: 100%;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
    span {
      position: absolute;
      background: #e83929;
      margin: -50% 0 0 0;
      color: white;
      border-right-style: 10px;
      border-top-right-radius: 13px;
      border-bottom-right-radius: 13px;
      padding: 5px;
    }
    .time {
      display: none;
    }
  }
  .newnews:nth-child(n + 3) {
    .newlink{
      display: flex;
    }

    img {
      width: 100px;
      height: 64px;
    }
    .newsmessage {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 0 0 0 10px;
    }
    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 40px;
      font-size: 14px;
      color: #504646;
    }
    span {
      position: absolute;
      background: rgba(0, 0, 0, 0.6);
      margin: 4px 0 0 -100px;
      font-size: 10px;
      color: #ffffff;
      border-top-right-radius: 13px;
      border-bottom-right-radius: 13px;
      padding: 3px;
    }
    .time {
      font-size: 10px;
      color: #999999;
    }
  }
}
</style>
<script>
import NewNews from "../components/NewNews.vue";
export default {
  data() {
    return {};
  },
   components: {
    NewNews
  },
  props: {
    newnews: {
      type: Array,
      required: true
    },
    title:{
      type:String,
      required:true
    }
  },
  methods: {},
  mounted() {}
};
</script>