<template>
  <section class="comment-input-container">
    <div class="section-title">留言</div>
    <form class="comment-input-box" @submit.prevent="submit">
      <div class="comment-input-body input-box">
        <textarea placeholder="问点什么呢..." v-model="msg" @input="input"></textarea>
      </div>
      <div class="comment-input-foot">
        <div class="user-info image-left">
          <div class="user-image ratio round"><img :src="userImage" alt="用户头像"></div>
          <div class="user-content">{{userName}}</div>
        </div>
        <button type="submit" class="btn btn-submit">留言</button>
      </div>
    </form>
  </section>
</template>

<script>
import defaultImage from '~/assets/register.png';
import utils from '../plugins/utils.js';

export default {
  data() {
    return {
      msg: '',
      userImage: defaultImage,
      userName: '匿名用户',
    }
  },
  methods: {
    input: function(e) {
      var $this = e.target;

      // 内容增加，则容器高度增加，最大高高度不超过 250px（CSS 设置）
      if ($this.scrollHeight > $this.offsetHeight) {
        $this.style.height = $this.scrollHeight + 'px';
      }

      this.$emit('onInput', $this.value);
    },
    reset: function(value) {
      this.msg = value || '';
    },
    submit: function(e) {
      var msg = this.msg;
      msg = utils.decodeForXSS(msg);
      this.$emit('submit', msg);
    }
  }
};
</script>

<style lang="less" scoped>
.comment-input-box {
  border: 1px solid #bfbfbf;
  margin-bottom: 30px;
}
textarea {
  padding: 15px 20px;
  min-height: 115px;
  max-height: 250px;
}
.comment-input-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f2f2;
  padding: 8px 20px;
}
.user-info {
  font-size: 14px;
}
.user-image {
  width: 2em;
}
</style>