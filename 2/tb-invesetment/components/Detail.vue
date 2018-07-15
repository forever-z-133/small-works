<template>
    <el-row class="detail-contianer" :gutter="60">
        <el-col :span="13" :offset="3">
            <section class="detail-header" v-if="info">
                <h2 class="title">{{info.title}}</h2>
                <i class="type" v-if="info.type"><a href="javascript:;">{{info.type | articleType}}</a></i>
                <b class="author"><a href="javascript:;">{{info.author}}</a></b>
                <span class="time">{{info.time | covertTime}}</span>
            </section>
            <slot></slot>
            <Comment :id="id"></Comment>
        </el-col>
        <el-col :span="5" class="detail-aside-wrap">
            <slot name="aside">暂无信息</slot>
        </el-col>
    </el-row>
</template>

<script>
import Comment from '../components/Comment.vue';
import utils from '../plugins/utils.js';
// console.log(publishTime("1531143341000"))

export default {
    components: {
        Comment,
    },
    props: {
        id: { type: String, required: true },
        info: { type: Object, required: true },
    },
    created() {
        // utils.publishTime("1531143341000")
    },
    data() {
        return {
        }
    },
    filters: {
        covertTime: function(time) {
            time = utils.publishTime(time);
            time = time && time.split('-').map(x => utils.addZero(x)).join('-');
            return time;
        },
        articleType: function(index) {
            return utils.getArticleType(index);
        },
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

.detail-contianer {
    padding: 50px 0;
}
.detail-header {
    font-size: 14px;
    margin-bottom: 30px;
    .title {
        font-size: 20px;
        margin-bottom: 25px;
    }
    a {
        font: inherit;
        color: inherit;
    }
    .type {
        color: @color;
        font-size: 12px;
        line-height: 20px;
        padding: 0 .5em;
        border: 1px solid @color;
        border-radius: 3px;
    }
    .author {
        color: @color;
        margin-left: .5em;
    }
    .time {
        color: @color_grey;
    }
    .time:not(:empty)::before {
        content: "·";
        margin: .5em;
    }
}
</style>