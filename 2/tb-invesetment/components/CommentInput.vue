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
import defaultImage from '~/assets/userCenter/head-default.png';
import { decodeForXSS } from '../plugins/utils.js';
import { findUserInfoAndUserCompanyByUserId } from '../plugins/userApi.js';

export default {
  data() {
    return {
      msg: '',
      userImage: defaultImage,
      userName: '匿名用户',
    }
  },
  mounted() {
    var userinfo = window.localStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo) || {};
    var tel = window.localStorage.getItem('telphone') || userinfo.mobileno;
    // 比如 15972921527 转为 15*****1527
    tel = tel ? tel.split('').map((x, i) => i > 1 && i < tel.length - 4 ? '*' : x).join('') : '';
    if (tel) this.userName = tel;
    // this.getUserName().then(name => {
    //   this.userName = name || tel;
    // }).catch(err => {});
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
      msg = decodeForXSS(msg);
      this.$emit('submit', msg);
    },
    getUserName: function(callback) {
      return new Promise((resolve, reject) => {
        var userinfo = window.localStorage.getItem('userinfo');
        userinfo = userinfo ? JSON.parse(userinfo) : '';
        var name = window.localStorage.getItem('username');
        if (name) {
          callback && callback(name);
          resolve(name);
        } else if (userinfo && userinfo.name) {
          name = userinfo.name;
          callback && callback(name);
          resolve(name);
        } else {
          findUserInfoAndUserCompanyByUserId().then(res => {
            name = res.data ? res.data.name : '';
            if (!name) return reject('');
            callback && callback(name);
            resolve(name);
          }).catch(reject);
        }
      });
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