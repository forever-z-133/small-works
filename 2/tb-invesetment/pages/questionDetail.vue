<template>
    <Detail :id="id" :info="info">
        <article v-html="article" class="article-wrap" v-loading="loading"></article>
        <nuxt-link :to="'/reportDetail/?id='+sourceId" v-if="sourceId" class="btn btn-more-report">阅读相关报告</nuxt-link>

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
            loading: true,
            info: {
                title: '标题标题标题标题',
                author: '作者',
                type: '类型',
                time: '0000-00-00',
            },
            sourceId: '',
            article: '',
            newnews: [],
        }
    },
    head() {
        return { title: this.info.title }
    },
    created() {
        if (!this.id) {
            this.loading = false;
            return this.$message.error('缺少关键ID，无法获取文章');
        }

        getArticleDetail(this.id).then(this.render_article).catch(err => {
            this.loading = false;
            this.$message.error('数据获取失败');
        });

        this.gethotArticles();
    },
    mounted () {
        var min = document.querySelector('.detail-contianer')
        this.scroller = new utils.scrollPercent(window, 0, 100);
    },
    beforeDestroy() {
        this.scroller.destroy();
    },
    methods: {
        render_article(data) {
            this.info.title = data.title;
            this.info.author = '沙利文' || data.auditby;
            this.info.type = data.articletype;
            this.info.time = data.createdat;
            // 文章内容
            var html = data.content;
            // html = utils.replaceImageInHtml(html, this.imgbaseurl);
            this.article = html;
            // 相关文献
            this.sourceId = data.reportid;
            // this.sourceId = data.industriesid ? data.industriesid[0] : '';
            // 绑定滚动事件
            this.scroller.init();
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
</style>