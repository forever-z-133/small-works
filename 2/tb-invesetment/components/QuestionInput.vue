<template>
    <section class="question-input-wrap zyh-input-wrap">
        <div class="input-wrap-head">
            <div class="section-title">问答</div>
        </div>
        <form @submit.prevent="submit" class="zyh-input-wrap-body">
            <!-- <div class="form-group">
                <label class="label">写下问答的标题</label>
                <div class="input-box min-height">
                    <textarea name="title" v-model="input.title" placeholder="例如：为什么马云能赚那么多钱，而你是个穷鬼？" @input="justifyLength('title', 500, $event)"></textarea>
                    <span class="input-length">0/500</span>
                </div>
            </div> -->
            <div class="form-group">
                <label class="label">简单描述你的问题</label>
                <div class="input-box min-height">
                    <textarea name="question" v-model="input.question" placeholder="请描述你的问题" @input="justifyLength('question', 5000, $event)"></textarea>
                    <span class="input-length">0/5000</span>
                </div>
            </div>
            <div class="form-group">
                <label class="label">联系方式</label>
                <div class="input-box">
                    <input name="moblie" v-model="input.moblie" autocomplete="off" placeholder="可注明手机号、微信号">
                </div>
            </div>
            <button type="submit" class="btn btn-submit zyh-btn-big">提交问答</button>
        </form>
    </section>
</template>

<script>
import { decodeForXSS } from '../plugins/utils.js';
import { findUser } from "../plugins/ajax_zyh.js";

export default {
    props: ['data'],
    data() {
        return {
            input: this.data || {
                // title: '',
                question: '',
                moblie: '',
            }
        }
    },
    mounted() {
        if (!window.localStorage.getItem('telphone')) {
            var tel = window.localStorage.getItem('telphone')
            this.input.moblie = this.input.moblie || tel;
        }

        findUser().then(data => {
            if (!data) reject(data);
            window.localStorage.setItem('telphone', data.mobileno);
            this.input.moblie = this.input.moblie || data.mobileno;
        });
    },
    methods: {
        justifyLength(key, max, e) {
            var value = e.target.value
            var length = value.length;
            if (length > max) {
                this.input[key] = value.slice(0, max);
                length = max;
            }
            e.target.nextSibling.innerText = length + '/' + max;
        },
        submit(e) {
            var data = {...this.input};
            data = decodeForXSS(data);
            this.$emit('submit', data);
        }
    }
}
</script>

<style lang="less" scoped>
.label {
    display: block;
    font-size: 18px;
    line-height: 1;
    font-weight: bold;
    margin-bottom: 15px;
}
.zyh-input-wrap textarea[name="title"] {
    min-height: auto;
}
.input-box {
    border-radius: 5px;
    overflow: hidden;
    padding: 15px 20px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    margin-bottom: 20px;
}
[name="question"] {
    min-height: 100px;
}
.btn-submit {
    margin: 45px auto -10px;
}
</style>
