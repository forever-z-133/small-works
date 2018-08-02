<template>
    <div >
        <ul  class="fooview">
          <slot name="before"></slot>
          <li><img @click="openquestion" @mouseenter="isquestionshow=true" @mouseleave="isquestionshow=false" :src="(isshow||isquestionshow)?questionactive:question"></li>
          <!-- <li><img  src="../assets/images/server_icon.png"></li> -->
          <li><img v-if="istop" @click="totop" @mouseenter="istopactive=true" @mouseleave="istopactive=false" :src="istopactive?topactive:top"></li>
          <slot></slot>
          <slot name="after"></slot>
        </ul>
        <QuestionInputDialog :visible.sync="isshow"></QuestionInputDialog>
    </div>
</template>

<style lang="less" scoped>
.fooview {
  position: fixed;
  top: 70%;
  right: 0;
  z-index: 20;
  li {
    margin: 0;
    padding: 0;
    width: 54px;
    height: 54px;
  }
  img {
    width: 54px;
    height: 54px;
  }
}
</style>
<script>
import QuestionInputDialog from "../components/QuestionInputDialog.vue";
export default {
  data() {
    return {
      isshow: false,
      isquestionshow:false,
      question: require("../assets/images/question_icon.png"),
      questionactive: require("../assets/images/question_active_icon.png"),
      top: require("../assets/images/top_icon.png"),
      topactive: require("../assets/images/top_active_icon.png"),
      istopactive: false,
      istop: false,
      scrollTop: '',
    };
  },
  components: {
    QuestionInputDialog
  },
  props: {},
  methods: {
    openquestion: function() {
      this.isshow = true;
    },
    scrollToTop: function(el) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
         this.scrollTop =window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let browserHeight = window.outerHeight;
      if (scrollTop > browserHeight) {
        this.istop = true;
      } else {
        this.istop = false;
      }
    },
    totop: function() {
      console.log("1")
      this.istopactive=true;
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
         
        } else {
          cancelAnimationFrame(timer);
          
        }
      });
      this.istopactive=true;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  }
};
</script>