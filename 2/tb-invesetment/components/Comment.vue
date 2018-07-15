<template>
    <el-row>
        <CommentInput @submit="submit" ref="comment"></CommentInput>
        <CommentList :id="id" ref="list"></CommentList>
    </el-row>
</template>

<script>
import CommentInput from '../components/CommentInput.vue';
import CommentList from '../components/CommentList.vue';
import { addComment } from '../plugins/ajax_zyh';

export default {
    components: {
        CommentInput,
        CommentList,
    },
    props: {
        id: { type: String, required: true },
    },
    data () {
        return { msg: '' }
    },
  mounted() {
      var temp = window.sessionStorage.getItem('temp_comment');
      temp = JSON.parse(temp);
      var data = temp ? temp : data;
      this.$refs.comment.reset(data);
      window.sessionStorage.removeItem('backto');
  },
    methods: {
        submit(msg) {

            if (!msg) return this.$message.warning('至少写点什么吧');

            if (!window.localStorage.getItem('userinfo')) {
                window.sessionStorage.setItem('temp_comment', JSON.stringify(msg));
                this.$message.warning('请先登录');
                var href = window.location.href;
                href = href.replace(window.location.origin, '');
                window.sessionStorage.setItem('backto', href);
                return this.$router.push('/login');
            }
            
            addComment(this.id, msg).then(() => {
                this.$emit('success', msg);
                this.$refs.comment.reset();
                this.$refs.list.reload_list(); 
                window.sessionStorage.removeItem('temp_comment');
            }).catch(err => {
                this.$message('留言列表数据：' + (err.message || err.msg), { type: 'error' });
            });
        }
    }
}
</script>

<style>

</style>
