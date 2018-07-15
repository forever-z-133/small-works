<template>
    <!-- <Detail :id="id" :info="info" v-loading.fullscreen="loading"> -->
    <Detail :id="''" :info="info" v-loading.fullscreen="loading">
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
                                <!-- <h2>1-1 阿达 阿达三大</h2>
                                <h3>1-1-1 阿达 阿达三大</h3>
                                <p>在从前的纸媒时代，话语权是高度集中的，报纸杂志写什么，读者看什么；几乎全中国的意见领袖都集中在了各大杂志报刊里面，并且通过杂志的审美取向对读者进行筛选。比如追求生活品质的读者大部分选择《三联生活周刊》，数码爱好者不少也会订阅《大众软件》，这种内容输出几乎是单向的，一本杂志里面大部分的内容对于读者来说可能都是没有阅读价值的。</p>
                                <p>今天的中国，正在向着历史的山巅行进。中国共产党人的奋勇开拓与中华民族的伟大复兴，形成穿越时空的激昂合奏。“红色理论家”郑德荣，毕生追求马克思主义真理之光；植物学家钟扬，以颗颗种子造福万千苍生；“当代愚公”黄大发，修完“生命渠”又带领村民走上致富路；诺贝尔奖获得者屠呦呦，年近九旬还在为中医药创新继续探索……在改革创新最前沿奋力争先，在脱贫攻坚战场上闯关夺隘，在基层治理第一线躬身实践，神州大地上，千千万万共产党员正以永不懈怠的精神状态，干在实处、走在前列。</p>
                                <figure>
                                    <img src="../assets/timg7.png" alt="">
                                    <span>图 1-1</span>
                                </figure>
                                <p>在从前的纸媒时代，话语权是高度集中的，报纸杂志写什么，读者看什么；几乎全中国的意见领袖都集中在了各大杂志报刊里面，并且通过杂志的审美取向对读者进行筛选。比如追求生活品质的读者大部分选择《三联生活周刊》，数码爱好者不少也会订阅《大众软件》，这种内容输出几乎是单向的，一本杂志里面大部分的内容对于读者来说可能都是没有阅读价值的。</p> -->
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
    </Detail>
</template>

<script>
import Detail from '../components/Detail.vue';
import RepeatItem from '../components/RepeatItem.vue';
import NewNewsList from "../components/NewNewsList.vue";

import utils from '../plugins/utils.js';
import { getReportDetail, getReportInfo, findUser } from "../plugins/ajax_zyh.js";
import $axios from "../plugins/axios.js";

export default {
    components: {
        Detail,
        RepeatItem,
        NewNewsList,
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
        }
    },
    head() {
        return { title: this.info.title }
    },
    created() {
        if (!this.id) {
            this.loading = false;
            return this.$message.error('未获得报告 ID');
        }

        // this.id = '5b3b6a42cac9f6367dc81e4e'
        getReportDetail(this.id).then(data => {
            this.loading = false;
            this.convertData(data);
        }).catch(err => {
            this.loading = false;
            this.$message.error('报告数据请求失败');
        });

        this.gethotArticles();
    },
    methods: {
        convertData (data) {
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
                            y.content = '';
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

            console.log(item);
            // getReportDetail(item.id).then(res => {
            //     console.log(res);
            // })
            // item.reply 
            // console.log(this.data[index]);

        },
        // 请求获取内容
        getContent (item) {
            return new Promise((resolve, reject) => {
                // (function _load(now, children){
                //     if (!children || children.length < 1) return null;
                //     children.map((section, i) => {
                //         if (x.children) {
                //             _load(x, x.children);
                //         }
                //         if (!x.sections) return null;
                //         getReportInfo(x.id).then(res => {
                //             x.content = res;
                //         }).catch(reject);
                //     })
                // })(item, item.children)
            })
        },
        verification () {
            return new Promise((resolve, reject) => {
                if (!window.localStorage.getItem('userinfo')) {
                    reject({code:'40001',data:null,msg:'请先登录'});
                    this.$message.warning('请先登录');
                    return this.$router.push('/login');
                }

                if (!window.localStorage.getItem('telphone')) {
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
</style>
