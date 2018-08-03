<template>
    <Detail :id="id" :info="info" :hasNothing="hasNothing">
        <section class="picture-wrap" v-if="slides && slides.length>0" ref="wrap">
            <el-carousel arrow="never" :autoplay="false" indicator-position="none" ref="swiper" @change="swiperChange">
                <el-carousel-item v-for="item in slides" :key="item">
                    <img :src="item">
                    <!-- <div v-html="item"></div> -->
                </el-carousel-item>
                <div class="bg" v-loading="loading">
                    <div class="arrow arrow-left" @click="prev" :class="{'hide':!showArrowLeft}"><i class="el-icon-arrow-left"></i></div>
                    <div class="arrow arrow-right" @click="next" :class="{'hide':!showArrowRight}"><i class="el-icon-arrow-right"></i></div>
                </div>
            </el-carousel>
            <nuxt-link :to="'/reportDetail/?id='+sourceId" v-if="sourceId" class="btn btn-more-report">阅读相关报告</nuxt-link>
        </section>

        <div slot="action">
            <div class="item" @click="jumpToComment">
                <i class="icon icon-comment"></i>
                <span>0</span>
            </div>
        </div>

        <FooView></FooView>
    </Detail>
</template>

<script>
import Detail from '../components/Detail.vue';
import NewNewsList from "../components/NewNewsList.vue";
import FooView from "../components/FooView.vue";

import { replaceImageInHtml, scrollPercent } from "../plugins/utils.js";
import { addReadLog, getReportImageList } from "../plugins/ajax_zyh.js";
import $axios from "../plugins/axios.js";

var nothingTimer;

export default {
    components: {
        Detail,
        NewNewsList,
        FooView,
    },
    data() {
        return {
            id: this.$route.query.id || '',
            info: {
                title: '标题标题标题标题',
                author: '作者',
                type: '类型',
                time: '0000-00-00',
            },
            slides: [],
            showArrowLeft: true,  // 是否显示轮播箭头
            showArrowRight: true,
            loading: true,
            hasNothing: false,
            prevId: '',
            nextId: '',
        }
    },
    head() {
        return { title: this.info.title }
    },
    mounted () {
        // 如果从搜索结果而来，不可左右切换
        if (this.from === 'search') {
            this.showArrowLeft = false;
            this.showArrowRight = false;
        }

        if (!this.id) {
            this.hasNothing = true;
            nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
            return;
        }
        
        // 获取首页图表
        this.getOneImage(this.id);

        this.scroller = new scrollPercent();
    },
    beforeDestroy() {
        nothingTimer && clearTimeout(nothingTimer);
        this.scroller && this.scroller.destroy(res => {
            this.logId && addReadLog({
                id: this.logId,
                ...res,
            });
        });
    },
    methods: {
        getOneImage (id) {
            this.loading = true;
            getReportImageList(id).then(data => {
                this.loading = false;
                if (data.logId) {
                    this.logId = data.logId;
                    data = data.object;
                }
                if (data.prev) {
                    this.prevId = data.prev.id;
                    this.showArrowLeft = true;
                } else {
                    this.showArrowLeft = false;
                }
                if (data.next) {
                    this.nextId = data.next.id;
                    this.showArrowRight = true;
                } else {
                    this.showArrowRight = false;
                }
                if (data.me) {
                    data = data.me;
                } else {
                    this.hasNothing = true;
                    nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
                }
                
                this.id = data.id;
                var img = this.render_swiper(data);
                this.slides.length = 0;
                this.slides.push(img);

                this.initImageHeight();

                // 绑定滚动事件
                this.scroller.init();
            }).catch(err => {
                this.loading = false;
                this.hasNothing = true;
                nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
                console.log(err);
                this.$message.error('获取图表接口请求失败');
            });
        },
        prev () {
            if (!this.prevId) {
                this.$message.warning('这是第一个哟');
                this.showArrowLeft = false;
                return;
            }
            this.getOneImage(this.prevId);
            this.$router.replace('/pictureDetail?id=' + this.prevId);
        },
        next () {
            if (!this.nextId) {
                this.$message.warning('没有下一个咯');
                this.showArrowRight = false;
                return;
            }
            this.getOneImage(this.nextId);
            this.$router.replace('/pictureDetail?id=' + this.nextId);
        },
        render_swiper (data, push = true) {
            this.info.title = data.tinametle || data.name;
            this.info.author = '沙利文' || data.auditby;
            this.info.type = '5' || data.articletype;
            this.info.time = data.createdat;

            this.sourceId = data.reportid;

            var img = this.imgbaseurl + data.imageUrl;
            return img;
        },
        swiperChange (index) {
            this.initImageHeight();
            setTimeout(() => {
                this.initImageHeight();
            }, 500);
        },
        initImageHeight () {
            this.$swiper = this.$swiper || this.$refs.wrap;
            this.$box = this.$swiper && this.$swiper.querySelector('.el-carousel__container');
            setTimeout(() => {
                var $box = this.$box;
                var $dom = $box && $box.querySelector('.is-active');
                var $img = $dom && $dom.querySelector('img');
                if (!$box || !$img) return;
                $box.style.height = $img.offsetHeight + 'px';
            }, 300);
        },
        jumpToComment () {
            window.location.hash = 'comment';
            setTimeout(() => {
                var href = window.location.href;
                href = href.replace('#comment', '');
                window.history.replaceState({}, '', href);
            }, 0);
        },
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

.hide { opacity: 0 !important; pointer-events: none; }
.btn-more-report {
    max-width: 140px;
    font-size: 16px;
    padding: 10px 1em;
    display: block;
    margin: 0 auto 30px;
    color: @color;
    background: none;
}
.picture-wrap {
    position: relative;
    z-index: 1;
    margin-bottom: 30px;

    .arrow {
        position: absolute;
        z-index: 2;
        top: 50%;
        width: 2em;
        height: 2em;
        margin-top: -1em;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background: rgba(0, 0, 0, .7);
        opacity: .3;
        transition: opacity .1s;
    }
    .arrow:hover { opacity: 1; }
    .arrow-left { left: .5em; }
    .arrow-right { right: .5em; }
}
</style>


<style lang="less">

.picture-wrap {
    .el-carousel {
        margin-bottom: 30px;
    }
    .el-carousel__container {
        transition: height .2s;
    }
    img {
        width: 100%;
    }
}
</style>
