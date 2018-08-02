<template>
    <el-row class="detail-contianer" :gutter="60">
        <template v-if="!hasNothing">
            <el-col :span="13" :offset="3">
                <section class="detail-header" v-if="info">
                    <h2 class="title">{{info.title}}</h2>
                    <i class="type" v-if="info.type"><a href="javascript:;">{{info.type | articleType}}</a></i>
                    <b class="author"><a href="javascript:;">{{info.author}}</a></b>
                    <span class="time">{{info.time | covertTime}}</span>
                </section>
                <slot></slot>
                <Comment :id="id" v-if="!noComment" @commentNumber="commentNumber"></Comment>
            </el-col>
            <el-col :span="5" class="detail-aside-wrap">
                <section class="aside-action-wrap">
                    <slot name="action"></slot>
                    <div class="item" @click="favorite" :class="{'on': favoriteActive}">
                        <i class="icon icon-favorite"></i>
                        <span>{{favoriteNumber}}</span>
                    </div>
                </section>
                <slot name="aside"></slot>
            </el-col>
        </template>
        <template v-if="hasNothing">
            <div class="nothing">
                <i class="el-icon-warning"></i>
                未找到相应内容
            </div>
        </template>
    </el-row>
</template>

<script>
import Comment from '../components/Comment.vue';
import { publishTime, getArticleType, addZero } from '../plugins/utils.js';
import { addFavorite, deleteFavorite, getFavoriteNumber, getFavoriteState } from '../plugins/ajax_zyh.js';

export default {
    components: {
        Comment,
    },
    props: {
        id: { type: String, required: true },
        info: { type: Object, required: true },
        noComment: { type: Boolean, default: false },
        hasNothing: { type: Boolean, default: false },
    },
    created() {
    },
    data() {
        return {
            favoriteActive: false,
            favoriteNumber: 0,
        }
    },
    created() {
    },
    mounted() {
        this.getFavoriteNumber();
        this.getFavoriteState();
    },
    methods: {
        favorite () {
            if (!window.localStorage.getItem('userinfo')) {
                this.$message.warning('请先登录');
                var href = window.location.href;
                href = href.replace(window.location.origin, '');
                window.sessionStorage.setItem('backto', href);
                return this.$router.push('/login');
            }

            this.favoriteLoading = true;
            var fn = this.favoriteActive ? deleteFavorite : addFavorite;
            fn(this.id).then(res => {
                this.favoriteLoading = false;
                var text = this.favoriteActive ? '取消收藏' : '收藏';
                if (!res) return this.$message.error(text + '失败');
                if (!this.favoriteActive) {
                    this.favoriteNumber = this.favoriteNumber + 1;
                    this.favoriteActive = true;
                } else {
                    this.favoriteNumber = Math.max(this.favoriteNumber - 1, 0);
                    this.favoriteActive = false;
                }
            }).catch(err => {
                this.favoriteLoading = false;
                var text = this.favoriteActive ? '取消收藏' : '收藏';
                if (!err) this.$message.error(text + '失败');
            });
        },
        getFavoriteNumber() {
            getFavoriteNumber(this.id).then(res => {
                this.favoriteNumber = res;
            }).catch(err => {})
        },
        getFavoriteState() {
            getFavoriteState(this.id).then(res => {
                this.favoriteActive = res;
            }).catch(err => {})
        },
        commentNumber(total) {
        }
    },
    filters: {
        covertTime: function(time) {
            time = publishTime(time);
            time = time && time.split('-').map(x => addZero(x)).join('-');
            return time;
        },
        articleType: function(index) {
            return getArticleType(index);
        },
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

.detail-contianer {
    padding: 50px 0;
}
.nothing {
    height: 400px;
    font-size: 1.2em;
    font-weight: bold;
    letter-spacing: .2em;
    display: flex;
    align-items: center;
    justify-content: center;
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
        font-style: italic;
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