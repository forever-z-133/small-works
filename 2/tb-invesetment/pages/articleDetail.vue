<template>
    <Detail :id="id" :info="info" :hasNothing="hasNothing">
        <article v-html="article" class="article-wrap" v-loading="loading"></article>
        <nuxt-link :to="'/reportDetail/?id='+sourceId" v-if="sourceId" class="btn btn-more-report">阅读相关报告</nuxt-link>


        <div slot="action">
            <div class="item" @click="jumpToComment">
                <i class="icon icon-comment"></i>
                <span>0</span>
            </div>
        </div>
        <div class="aside-wrap" slot="aside">
            <NewNewsList v-if="newnews" title="热门文章" v-bind:newnews='newnews'></NewNewsList>
        </div>
        <FooView></FooView>
    </Detail>
</template>

<script>
import Detail from '../components/Detail.vue';
import NewNewsList from "../components/NewNewsList.vue";
import FooView from "../components/FooView.vue";

import { replaceImageInHtml, scrollPercent } from "../plugins/utils.js";
import { getArticleDetail, addReadLog } from "../plugins/ajax_zyh.js";
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
            loading: true,
            info: {
                title: '标题标题标题标题',
                author: '作者',
                type: '类型',
                time: '0000-00-00',
                favorite: '0',
            },
            sourceId: '',
            article: '',
            newnews: [],
            hasNothing: false,
        }
    },
    head() {
        return { title: this.info.title }
    },
    mounted () {
         if (!this.id) {
            this.loading = false;
            this.hasNothing = true;
            nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
            return this.$message.error('缺少关键ID，无法获取文章');
        }

        getArticleDetail(this.id).then(res => {
            this.render_article(res);
        }).catch(err => {
            console.log(err);
            this.loading = false;
            this.hasNothing = true;
            nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
            this.$message.error('数据获取失败');
        });

        this.gethotArticles();
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

        this.gallery && this.gallery.destroy();
    },
    methods: {
        render_article(data) {
            if (data.logId) {
                this.logId = data.logId;
                data = data.object;
            }

            this.info.title = data.title;
            this.info.author = '沙利文' || data.auditby;
            this.info.type = data.articletype;
            this.info.time = data.createdat;
            this.info.favorite = data.valid;
            // 文章内容
            var html = data.content;
            html = this.imgCanClick(html);
            this.article = html;
            // 相关文献
            this.sourceId = data.reportid;
            // 绑定滚动事件
            this.scroller.init();

            setTimeout(() => {
                var $body = document.querySelector('.el-main')
                this.gallery = lightGallery($body, { selector: '.gallery' });
            }, 50);
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
        jumpToComment () {
            window.location.hash = 'comment';
            setTimeout(() => {
                var href = window.location.href;
                href = href.replace('#comment', '');
                window.history.replaceState({}, '', href);
            }, 0);
        },
        imgCanClick (html) {
            if (!html) return '';
            return replaceImageInHtml(html, this.imgbaseurl, (img, src) => {
                return `<a href="${src}" class="gallery">${img}</a>`;
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
</style>
