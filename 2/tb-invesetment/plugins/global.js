
import Vue from 'vue'

var imgbaseurl= {
    install(Vue){
        Vue.prototype.imgbaseurl= "https://vestleo.oss-cn-shanghai.aliyuncs.com/"

        // 发布时间
        // 不久，60秒前，60分钟前，24小时前，昨天，前天，0000-00-00
        Vue.prototype.getPublishTime = (time, pattern) => {
            if (!time) return null;
            if (typeof time === 'string') time = new Date(time);
            if (time instanceof Date) time = time.getTime();
            var offset = Date.now() - time;
            if (offset < 1e3 && offset > -1) {
                return '不久';
            } else if (offset < 60*1e3) {
                return (offset / 1e3 >> 0) + '秒以前';
            } else if (offset < 60*60*1e3) {
                return (offset / (60*1e3) >> 0) + '分钟以前';
            } else if (offset < 24*60*60*1e3) {
                return (offset / (60*60*1e3) >> 0) + '小时以前';
            } else if (offset < 2*24*60*60*1e3) {
                return '昨天';
            } else if (offset < 3*24*60*60*1e3) {
                return '前天';
            } else if (offset >= 3*24*60*60*1e3) {
                return parseTime(new Date(time), pattern);
            } else {
                return null;
            }
        }
    }
}

Vue.use(imgbaseurl);
