<template>
    <div class="newnews" v-if="!!newnews">
        <div class="newlink"  @click="linkto(newnews.articletype,newnews.id)">
            <div>
                <img :src="url">
                
            </div>
            <div class="tip"><span>No.{{id+1}}</span></div>
            <div class="newsmessage">
            <p class="title">{{newnews.title}}</p>
            <p class="time">{{newnews.createdat|time}}</p>
            </div>

        </div>

    </div>
</template>

<style lang="less" scoped>
.newnews {
  position: relative;
    margin: 20px 0 0 0;
}
</style>
<script>
import { publishTime } from "../plugins/utils.js";
export default {
  data() {
    return {
       url: require("../assets/images/loading_image.gif"),
      errorurl:require("../assets/images/default_image.png")
    };
  },
  props: {
    newnews: {
      type: Object,
      required: true
    },
    id:{
      type:Number,
      required:true
    }
  },
  methods: {
    linkto(e,i){
      console.log(e)
      if(e==1){
         const { href } = this.$router.resolve({
            name: "articleDetail",
           query: { id: i }
          });
          window.open(href, "_blank");
        // this.$router.push({ name: "articleDetail", query: { id: i} });
      }else if(e==2){
         const { href } = this.$router.resolve({
            name: "questionDetail",
           query: { id: i }
          });
          window.open(href, "_blank");
        // this.$router.push({ name: "questionDetail", query: { id: i} });
      }else if(e==3){
        //公司todo
        const { href } = this.$router.resolve({
            name: "articleDetail",
           query: { id: i }
          });
          window.open(href, "_blank");
        // this.$router.push({ name: "questionDetail", query: { id: i} });
      }else if(e==4){
         //需求 todo
         const { href } = this.$router.resolve({
            name: "articleDetail",
           query: { id: i }
          });
          window.open(href, "_blank");
        // this.$router.push({ name: "questionDetail", query: { id: i} });
      }else if(e==5){
         const { href } = this.$router.resolve({
            name: "pictureDetail",
           query: { id: i,type:"normal"}
          });
          window.open(href, "_blank");
        // this.$router.push({ name: "pictureDetail", query: { id: i,type:"normal"} });
      }else{
         const { href } = this.$router.resolve({
            name: "reportDetail",
           query: { id: i}
          });
          window.open(href, "_blank");
        // this.$router.push({ name: "reportDetail", query: { id: i} });
      }
    }
  },
   filters: {
    time:function(value){
      var time = publishTime(value)
     return time
    }
  },
  mounted() {
     var newImg = new Image();
    newImg.src = this.imgbaseurl + this.newnews.images;
    newImg.onload = () => {
      // 图片加载成功后把地址给原来的img
      this.url = newImg.src;
    };
     newImg.onerror = () => { // 图片加载错误时的替换图片
    this.url = this.errorurl;
   }
  }
};
</script>