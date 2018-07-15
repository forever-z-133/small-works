<template>
    <el-dialog class="question-input-dialog margin-back" :visible.sync="visible">
        <QuestionInput @submit="submit" :data="data"></QuestionInput>
        <el-dialog class="question-ajax-success margin-back" append-to-body :visible.sync="successVisible">
            <section class="question-input-wrap zyh-input-wrap">
                <div class="input-wrap-head">
                    <div class="section-title">问答</div>
                </div>
                <div class="zyh-input-wrap-body">
                    <div class="input-success-wrap">
                        <div class="title"><i class="el-icon-success"></i>提问成功</div>
                        <span @click="reload">3s后跳转至首页 ></span>
                        <router-link to="/userCenter" class="btn btn-border">查看我的回答</router-link>
                    </div>
                </div>
            </section>
        </el-dialog>
    </el-dialog>
</template>

<script>
import QuestionInput from '../components/QuestionInput.vue';

import { addQuestion } from "../plugins/ajax_zyh.js";

export default {
    components: {
        QuestionInput
    },
    props: {
        visible: { type: Boolean, default: false },
    },
    data () {
        return {
            data: null,
            successVisible: false,
        }
    },
    watch: {
        visible: function(newVal) {
            this.$emit('update:visible', newVal)
        }
    },
    mounted() {
        var temp = window.sessionStorage.getItem('temp_question');
        temp = JSON.parse(temp);
        var data = temp ? temp : data;
        this.data = data;
        window.sessionStorage.removeItem('backto');
    },
    beforeDestroy() {
        this.Timer && clearTimeout(this.Timer);
    },
    methods: {
        submit (data) {

            if (!data.title) return this.$message('请输入标题', { type: 'warning' });
            if (!data.question) return this.$message('多写点问题的描述吧', { type: 'warning' });

            if (!window.localStorage.getItem('userinfo')) {
                window.sessionStorage.setItem('temp_question', JSON.stringify(data));
                this.$message.warning('请先登录');
                window.sessionStorage.setItem('backto', '/?question=true');
                return this.$router.push('/login');
            }
            
            addQuestion(data).then(res => {
                this.$emit('update:visible', false);
                this.$message.success('提问成功');
                window.sessionStorage.removeItem('temp_question');
                // this.$router.replace('/userCenter');
                this.successVisible = true;
                this.Timer = setTimeout(this.reload, 3000);
            }).catch(err => {
                this.$message(err.message || err.msg, { type: 'error' })
            });
        },
        reload: function() {
            var href = window.location.href;
            href = href.replace(/[\?#].*/, '');
            window.location.href = href;
        }
    }
}
</script>

<style lang="less">
@import "../assets/css/var.less";

.question-input-dialog {
    .el-dialog {
        max-width: 900px;
    }
    .zyh-input-wrap-body {
        max-width: 600px;
    }
}
.input-success-wrap {
    text-align: center;
    padding: 50px 1em;

    .title {
        font-size: 32px;
        font-weight: bold;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        
        i {
            color: @color;
            margin-right: 15px;
            font-size: 1.4em;
        }
    }
    span {
        display: block;
        margin: 35px auto 40px;
    }
    .btn {
        padding: 20px 80px;
    }
}
</style>
