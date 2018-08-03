<template>
    <section class="comment-list-wrap">
        <div class="section-title">最新留言</div>
        <div class="list-wrap" v-loading="loading">
            <div class="list-item image-left" v-for="(item, index) in data" :key="index">
                <div class="list-image ratio round">
                    <img :src="item.image" :alt="item.name">
                </div>
                <div class="list-content">
                    <h5 class="list-name">
                        <!-- <span class="notOnBoard" v-if="!item.reply">审核中</span> -->
                        <span>{{item.title}}</span>
                    </h5>
                    <div class="list-desc">
                        <p>{{item.desc}}</p>
                    </div>
                    <div class="comment-reply-list-wrap" v-if="item.reply">
                        <div class="list-item image-left" v-for="(reply, index) in item.reply" :key="index">
                            <div class="list-image ratio round">
                                <img :src="reply.image" alt="头豹管理员">
                            </div>
                            <div class="list-content">
                                <h5 class="list-name">
                                    <span>管理员</span>
                                </h5>
                                <div class="list-desc">
                                    <p>{{reply.desc}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-foot" v-if="state!=='none'">
                <div class="list-empty" v-if="state==='empty'||(data&&data.length<1)">没有更多了</div>
                <button class="btn btn-more" @click="load_list" v-if="showMore">查看更多</button>
            </div>
        </div>
    </section>
</template>

<script>
import defaultImage from '~/assets/userCenter/head-default.png';
import { getCommentList } from "../plugins/ajax_zyh.js";

export default {
    data() {
        return {
            data: [],
            page: 0,
            loading: true,
            state: 'load',
            showMore: false,
        }
    },
    props: {
        id: { type: String, required: true },
    },
    created() {
        if (!this.id) {
            this.loading = false;
            this.state = 'empty';
            return;
        }
        this.reload_list();
    },
    methods: {
        reload_list() {
            this.data = [];
            this.page = 0;
            this.state = 'load';
            this.load_list();
        },
        load_list() {
            this.loading = true;
            getCommentList(this.id, this.page).then(data => {
                this.page++;
                this.update_list(data.resultList || []);
                this.$emit('commentNumber', data.total);
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.state = 'empty';
            });
        },
        update_list(data) {
            if (data.total > this.data.length) {
                this.showMore = true;
            } else { this.showMore = false; }
            data = data.map(this.covert_list);
            if (data.length < 1) this.state = 'empty';
            this.data = this.data.concat(data);
        },
        covert_list(item, index) {
            let tel = item.mobileNo;
            tel = tel ? tel.split('').map((x, i) => i > 1 && i < tel.length - 4 ? '*' : x).join('') : '';
            item.title = tel || '匿名用户';
            item.desc = item.content;
            item.image = defaultImage;
            if (item.reply) {
                item.reply = [{ title: item.auditedBy, desc: item.reply, image: defaultImage }];
            }
            return item;
        },
        default_data() {
            return new Array(Math.random()*5>>0).fill().map((x, i) => {
                return {
                    image: '#',
                    name: '标题'.repeat(Math.random()*10>>0),
                    desc: '内容'.repeat(Math.random()*30>>0),
                    time: new Date(Math.random() * 10),
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

.list-wrap {
    margin-top: -10px;
}
.list-item {
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
    align-items: flex-start;
}
.list-image {
    width: 65px;
}
.list-name {
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 8px;
    margin-top: 12px;
    line-height: 1;
}
.list-desc {
    font-size: 14px;
    color: @color_grey;
}
.btn-more {
    margin: 40px auto;
    display: table;
    color: @color;
    background: none;
}
.list-empty {
    line-height: 30px;
    margin-top: 20px;
}
.notOnBoard {
    font-size: 12px;
    margin-right: 5px;
    line-height: 1;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid @color_grey;
    vertical-align: middle;
}
.comment-reply-list-wrap {
    position: relative;
    background: #F2F2F2;
    border-radius: 10px;
    margin-top: 15px;

    &::before {
        content: "";
        position: absolute;
        top: -14px;
        left: 30px;
        border: 7px solid transparent;
        border-bottom-color: #F2F2F2;
    }
    .list-item {
        padding: 20px 20px;
    }
    .list-image {
        width: 50px;
    }
    .list-content {
        margin-top: 5px;
    }
    .list-name {
        margin-top: 0;
    }
}
</style>
