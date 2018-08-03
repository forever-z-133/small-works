<template>
  <div>
    <div class="today_title">
      {{title}}
    </div>
    <div class="today_question">
      <div class="question">
        <div @click="golink(todayQa.id)" v-if="todayQa">
          <div class="question_title">
            <div class="triangle_border_right">
              <span></span>
            </div>
            <p>{{todayQa.title}}</p>
          </div>
          <img :src="url">
        </div>

      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
.today_title {
  font-size: 16px;
  color: #211e1e;
  padding: 20px 0;
  border-top: 2px solid #e83929;
  text-align: center;
  border-bottom: 1px dotted #ebe7e7;
}
.question {
  padding: 0 0 30px 0;
  cursor:pointer;
  img {
    width: 100%;
  }
  .question_title {
    padding: 12px 0;
    font-size: 16px;
    color: #333;
    p {
      margin: -3px 0 0 18px;
    }
  }
}
.triangle_border_right {
  position: relative;
}
.triangle_border_right span {
  display: block;
  width: 0;
  height: 0;
  border-width: 6px 0 6px 6px;
  border-style: solid;
  border-color: transparent transparent transparent #e83929;
  position: absolute;
}
</style>
<script>
export default {
  data() {
    return {
       url: require("../assets/images/loading_image.gif"),
      errorurl:require("../assets/images/default_image.png")
    };
  },
  props: {
    todayQa: {
      type: Object,
      required: true
    },
    title:{
      type:String,
      required:true,
    }
  },
  methods: {
    golink(i){
       const { href } = this.$router.resolve({
            name: "questionDetail",
           query: { id: i }
          });
          window.open(href, "_blank");
    }
  },
  mounted() {
     var newImg = new Image();
    newImg.src = this.imgbaseurl + this.todayQa.images;
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