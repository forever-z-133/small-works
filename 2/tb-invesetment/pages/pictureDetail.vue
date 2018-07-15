<template>
    <Detail :id="id" :info="info">
        <section class="picture-wrap" v-if="slides && slides.length>0" ref="wrap">
            <el-carousel arrow="never" :autoplay="false" indicator-position="none" ref="swiper" @change="swiperChange">
                <el-carousel-item v-for="item in slides" :key="item">
                    <div v-html="item"></div>
                </el-carousel-item>
                <div class="arrow arrow-left" @click="prev" v-if="showArrow"><i class="el-icon-arrow-left"></i></div>
                <div class="arrow arrow-right" @click="next" v-if="showArrow"><i class="el-icon-arrow-right"></i></div>
            </el-carousel>
            <nuxt-link :to="'/reportDetail/?id='+sourceId" v-if="sourceId" class="btn btn-more-report">阅读相关报告</nuxt-link>
        </section>

        <div class="aside-wrap" slot="aside">
            <NewNewsList v-if="newnews" title="热门文章" v-bind:newnews='newnews'></NewNewsList>
        </div>
    </Detail>
</template>

<script>
import Detail from '../components/Detail.vue';
import NewNewsList from "../components/NewNewsList.vue";

import utils from "../plugins/utils.js";
import { getArticleDetail } from "../plugins/ajax_zyh.js";
import $axios from "../plugins/axios.js";

export default {
    components: {
        Detail,
        NewNewsList,
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
            showArrow: true,  // 是否显示轮播箭头
            newnews: [],
            lastIndex: 0,
            tempData: {},
        }
    },
    head() {
        return { title: this.info.title }
    },
    created() {
        // 如果从搜索结果而来，不可左右切换
        if (this.from === 'search') {
            this.showArrow = false;
        }
        
        // 获取首页图表
        this.getOneImage(this.id);
        // 获取右侧文章列表
        this.gethotArticles();
    },
    methods: {
        getOneImage (id) {
            var $loading = this.$loading({ fullscreen: true })
            getArticleDetail(this.id).then(data => {
                $loading.close();
                this.render_swiper(data);
            }).catch(err => {
                $loading.close();
                console.log(err);
                this.$message.error('获取图表接口请求失败');
            });
        },
        prev () {
            this.getNextImage(this.id, -1).then(data => {
                if (!data) this.message.warning('这是第一个了');
                this.$refs.swiper.prev();
            });
        },
        next () {
            this.getNextImage(this.id, 1).then(data => {
                if (!data) this.message.warning('没有下一个了');
                this.$refs.swiper.next();
            });
        },
        getNextImage (id, direction) {
            var $loading = this.$loading({ fullscreen: true });
            return new Promise((resolve, reject) => {
                if (id in this.tempData) {
                    $loading.close();
                    var data = this.tempData[id];
                    this.render_swiper(data);
                    return resolve(data);
                }

                // resolve()
                // getArticleDetail(this.id).then(data => {
                //     this.render_swiper(data);
                //     this.initImageHeight();
                //     this.id = data.id;
                //     $loading.close();
                // }).catch(err => {
                //     $loading.close();
                //     console.log(err);
                //     this.$message.error('获取图表接口请求失败');
                // });
            });
        },
        render_swiper (data) {
            this.id = data.id;
            this.tempData[this.id] = data;

            this.info.title = data.title;
            this.info.author = '沙利文' || data.auditby;
            this.info.type = data.articletype;
            this.info.time = data.createdat;

            var html = data.content;
            html = utils.replaceImageInHtml(html, this.imgbaseurl);
            this.slides = [html];

            this.sourceId = data.reportid;
        },
        swiperChange () {
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
        // 获取热门文章
        gethotArticles() {
            $axios({
                method: "get",
                url: "/cmsArticle/hotArticles"
            }).then(res => {
                if (res.data.code != 0) return;
                this.newnews = res.data.data;
            }).catch(err => {
                console.log(err);
            });
        },
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

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
    img {
        width: 100%;
    }
}
</style>
