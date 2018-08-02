<template>
    <div class="subject-wrap" v-if="data && data.length>0">
        <div class="section-wrap" v-for="(subject, index) in data" :key="index">
            <div class="section-head">
                <h2 v-if="subject.level==1">{{subject.markStr+subject.name}}</h2>
                <h3 v-else-if="subject.level==2">{{subject.markStr+' '+subject.name}}</h3>
                <h4 v-else-if="subject.level==3">{{subject.markStr+' '+subject.name}}</h4>
                <h5 v-else>{{subject.markStr+' '+subject.name}}</h5>
            </div>
            <div class="section-body" v-if="subject.sections && subject.sections.length>0">
                <div class="section-item" v-for="(section, i) in subject.sections" :key="i">
                    <p v-if="section">{{section.text | imgCanClick(imgbaseurl)}}</p>
                    <template v-if="section && section.illustrations && section.illustrations.length>0">
                        <figure v-for="(img, j) in section.illustrations" :key="j">
                            <a :href="img.imageUrl | addSrcPrefix(imgbaseurl)" class="gallery">
                                <img v-if="img && img.imageUrl" :src="img.imageUrl | addSrcPrefix(imgbaseurl)" @click="clickImg">
                            </a>
                            <span v-if="img && img.title">{{img.title}}</span>
                        </figure>
                    </template>
                </div>
            </div>
            <RepeatItem v-if="subject.children" :data="subject.children"></RepeatItem>
        </div>
    </div>
</template>

<script>
import { addSrcPrefix, replaceImageInHtml } from '../plugins/utils.js'

export default {
    name: 'RepeatItem',
    props: ['data'],
    methods: {
        clickImg (e) {
            var src = e.target.src;
            console.log(src);
        },
    },
    filters: {
        addSrcPrefix (url, prefix) {
            return addSrcPrefix(url || '', prefix)
        },
        imgCanClick (html, imgbaseurl) {
            if (!html) return '';
            return replaceImageInHtml(html, imgbaseurl, (img, src) => {
                return `<a href="${src}" target="_blank">${img}</a>`;
            });
        },
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";

.subject-wrap {
    line-height: 1.5;
    
    p {
        line-height: 25px;
        font-size: 14px;
        margin: 0 0 10px;
    }
    h2 {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 10px;
    }
    h3 {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;
    }
    h4 {
        font-size: 15px;
        line-height: 23px;
        margin-bottom: 10px;
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