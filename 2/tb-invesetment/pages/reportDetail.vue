<template>
    <!-- <Detail :id="id" :info="info" v-loading.fullscreen="loading"> -->
    <Detail :id="id" :info="info" v-loading.fullscreen="loading" no-comment :hasNothing="hasNothing">
        <section class="report-main-wrap">
            <div class="report-main-head">
                <div class="section-title">目录</div>
            </div>
            <div class="report-main-body">
                <div class="report-main-list" v-if="data && data.length>0">
                    <div class="report-main-item" v-for="(item, index) in data" :key="index">
                        <div class="report-main-item-head" :class="{'active':item.showBody}" @click="clickToggle(index)">
                            <i class="icon icon-number">{{index+1}}</i>
                            <h1 class="report-main-item-title">{{item.name}}</h1>
                            <i class="icon icon-report-arrow"></i>
                        </div>
                        <div class="report-main-item-body" v-loading="item.loading">
                            <div class="report-main-item-section">
                                <RepeatItem :data="item.children"></RepeatItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="empty" v-else>暂无信息</div>
            </div>
        </section>
        
        <div class="aside-wrap" slot="aside">
            <NewNewsList v-if="newnews" title="热门文章" v-bind:newnews='newnews'></NewNewsList>
        </div>

        <FooView>
            <div class="more-fixed-btns" slot="before">
                <li class="btn-expand open" @click="openAll">全部展开</li>
                <li class="btn-expand close" @click="closeAll">全部关闭</li>
            </div>
        </FooView>
    </Detail>
</template>

<script>
import Detail from '../components/Detail.vue';
import RepeatItem from '../components/RepeatItem.vue';
import NewNewsList from "../components/NewNewsList.vue";
import FooView from "../components/FooView.vue";

import { scrollPercent, replaceImageInHtml } from "../plugins/utils.js";
import { getReportDetail, getReportInfo, findUser, addReadLog } from "../plugins/ajax_zyh.js";
import $axios from "../plugins/axios.js";

var nothingTimer;

export default {
    components: {
        Detail,
        RepeatItem,
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
                type: 99,
                time: '0000-00-00',
            },
            data: [],
            newnews: [],
            hasNothing: false,
        }
    },
    head() {
        return { title: this.info.title }
    },
    mounted() {
        if (!this.id) {
            this.loading = false;
            this.hasNothing = true;
            nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
            return this.$message.error('未获得报告 ID');
        }

        getReportDetail(this.id).then(data => {
            this.loading = false;
            this.convertData(data);
        }).catch(err => {
            this.loading = false;
            this.hasNothing = true;
            nothingTimer = setTimeout(() => this.$router.replace({ name: 'index' }), 5000);
            this.$message.error('报告数据请求失败');
        });

        this.gethotArticles();

        window.sessionStorage.removeItem('backto');
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
        convertData (data) {
            if (data.logId) {
                this.logId = data.logId;
                data = data.object;
            }

            var main = data[0];
            this.info.title = main.name;
            this.info.author = '沙利文' || '';
            this.info.time = main.updatedAt;

            // 划分层级
            var mainData = (function _find(now, rest, level) {
                if (!now.subjects || now.subjects.length < 1) return null;
                return now.subjects.reduce((re, x) => {
                    return re.concat(rest.filter((y, i) => {
                        if (x == y.id) {
                            y.content = y.content ? y.content : '';
                            y.loading = true;
                            y.level = level;
                            y.mark = (now.mark || []).concat([re.length+1]);
                            y.markStr = y.mark.join('-');
                            y.children = _find(y, rest, 1+level);
                            return true;
                        } else return false;
                    }));
                }, []);
            })(main, data.slice(1), 1);
            this.data = mainData;
            // 绑定滚动事件
            this.scroller.init();

            setTimeout(() => {
                var $body = document.querySelector('.el-main')
                this.gallery = lightGallery($body, { selector: '.gallery' });
            }, 50);
        },
        clickToggle (index) {
            this.verification.call(this).then(() => {
                this.toggleContent(index);
            });
        },
        // 显示内容
        toggleContent (index) {
            var item = this.data[index];
            item.showBody = !item.showBody;
            this.$set(this.data, index, item);
        },
        verification () {
            return new Promise((resolve, reject) => {
                if (!window.localStorage.getItem('userinfo')) {
                    reject({code:'40001',data:null,msg:'请先登录'});
                    this.$message.warning('请先登录');
                    var href = window.location.href;
                    href = href.replace(window.location.origin, '');
                    window.sessionStorage.setItem('backto', href);
                    return this.$router.push('/login');
                }

                if (window.localStorage.getItem('telphone')) {
                    var tel = window.localStorage.getItem('telphone')
                    return resolve({ mobileno: tel });
                }

                findUser().then(data => {
                    if (!data) reject(data);
                    window.localStorage.setItem('telphone', data.mobileno);
                    resolve(data);
                }).catch(reject);
            })
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
        openAll() {
            if (!window.localStorage.getItem('userinfo')) {
                this.$message.warning('请先登录');
                var href = window.location.href;
                href = href.replace(window.location.origin, '');
                window.sessionStorage.setItem('backto', href);
                return this.$router.push('/login');
            }
            
            this.data = this.data.map(item => {
                item.showBody = true;
                return item;
            });
        },
        closeAll() {
            this.data = this.data.map(item => {
                item.showBody = false;
                return item;
            });
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

.empty {
    min-height: 60px;
    margin-bottom: 30px;
}

.report-main-list {
    margin-bottom: 30px;

    .report-main-item:last-of-type {
        border-bottom: 1px solid @color_line;
    }
}
.report-main-item-head {
    display: flex;
    align-items: center;
    line-height: 1;
    padding: 20px 0;
    border-top: 1px solid @color_line;

    &.active .icon-report-arrow {
        transform: rotate(180deg);
    }
    &.active + .report-main-item-body {
        display: block !important;
    }
}
.icon-number {
    border-radius: 100%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @color;
    font-size: 12px;
    margin-right: 10px;
}
.report-main-item-title {
    font-size: 16px;
    font-weight: normal;
    font-weight: bold;
    flex-grow: 1;
}
.icon-report-arrow {
    width: 1.1em;
    height: 1.1em;
    display: block;
    background-image: url(../assets/unfold.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
}
.report-main-item-body {
    margin: 0 0 0 35px;
    background: #f2f2f2;
    padding: 20px 25px;
    margin-bottom: 20px;
    display: none !important;
}
.report-main-item-section {
    line-height: 1;

    p {
        line-height: 25px;
        font-size: 14px;
        margin: 0 0 15px;
    }
    h2 {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 10px;

        // & + p {
        //     margin-top: 5px;
        // }
    }
    h3 {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;

        // & + p {
        //     margin-top: 5px;
        // }
    }
    figure {
        margin: 0 0 10px;
        border-radius: 0;

        img {
            max-width: 100%;
            min-width: 300px;
            display: block;
            margin: 0 auto 5px;
        }
        span {
            font-size: 12px;
            text-align: center;
            display: block;
            color: @color_grey;
            line-height: 1;
        }
    }
    & > :last-child {
        margin-bottom: 0;
    }
}
.btn-expand {
    text-indent: -999em;
    background-position: 0 0;
    background-size: 200% 200%;
    background-image: url(/assets/images/expand.jpg);
    cursor: pointer;
}
.btn-expand.open { background-position: 0 0; }
.btn-expand.close { background-position: 100% 0; }
.btn-expand:hover.open { background-position: 0 100%; }
.btn-expand:hover.close { background-position: 100% 100%; }
.btn-expand:last-child {
    margin-bottom: 10px;
}
</style>
