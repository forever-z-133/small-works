import { ajaxUpload } from "../plugins/ajax_zyh.js";

// 判断类型
export const TypeOf = (obj) => {
    return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

// 去掉可能的 XSS 攻击代码
export const decodeText = (msg) => {
    if (!msg) return '';
    let ele = document.createElement('span');
    ele.appendChild( document.createTextNode( msg ) );
    return ele.innerHTML;
}

// 递归获取 Object 的值
export const deepObject = (obj, fn) => {
    for (var i in obj) {
        if (TypeOf(obj[i]) === 'object') {
            obj[i] = deepObject(obj[i], fn)
        } else {
            obj[i] = fn ? fn(obj[i]) : obj[i];
        }
    }
    return obj;
}

// 去除 XSS 代码
export const decodeForXSS = (obj) => {
    if (typeof obj === 'string') return decodeText(obj);
    return deepObject(obj, val => {
        return typeof val === 'string' ? decodeText(val) : val;
    });
}

// 将 date 对象转为 pattern 格式
export const parseTime = (date, pattern = 'yyyy-mm-dd') => {
    var str = pattern;
    str = str.replace(/y{4}|y{2}/i, date.getFullYear());
    str = str.replace(/m{2}/i, (date.getMonth()+1));
    str = str.replace(/d{2}/i, date.getDate());
    str = str.replace(/h{2}/i, date.getHours());
    str = str.replace(/n{2}/i, date.getMinutes());
    str = str.replace(/s{2}/i, date.getSeconds());
    return str;
}

// 补零
export const addZero = (num, len = 2) => {
    if ((num + "").length >= len) return num;
    return addZero("0" + num, len);
}

// 发布时间
// 不久，60秒前，60分钟前，24小时前，昨天，前天，0000-00-00
export const publishTime = (time, pattern) => {
    if (!time) return null;
    if (typeof time === 'string'){
        var arr = time.split(/[- : \/]/),
        time = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    } 
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

// 替换文本中的链接，比如加前缀什么的
function _replaceSrcInHtml(reg) {
    return function(html, baseUrl, fn) {
        return html.replace(reg, (img, src) => {
            let newSrc = addSrcPrefix(src, baseUrl);
            img = img.replace(src, newSrc);
            if (fn) img = fn(img, src);
            return img;
        });
    }
}
export const addSrcPrefix = (url, baseUrl) => {
    if (typeof baseUrl === 'function') {
        return baseUrl(url)
    } else {
        baseUrl = baseUrl.replace(/\/$/, '') + '/';
        url = url.replace(/^\/*/, '');
        if (!!~url.indexOf('http')) baseUrl = '';
        return url ? baseUrl + url : '';
    }
}
export const replaceImageInHtml = _replaceSrcInHtml(/<img[^src]+src="([^"]*)"[^>]*>/g, addSrcPrefix);
export const replaceVideoInHtml = _replaceSrcInHtml(/<video[^src]+src="([^"]*)"[^>]*>/g, addSrcPrefix);

// 文章类型
const articleType = {
    1: '新闻',
    2: '问答',
    3: '公司',
    4: '需求',
    5: '图说',
    6: '报告',
    99: '报告',
};
export const getArticleType = (index) => {
    return articleType[index];
}

// 上传图片
export const uploadImage = (files) => {
    return new Promise((resolve, reject) => {
        if (!files || files.length < 1) return;
        var file = files[0];
        if (!/\.jpe?g|png/.test(file.name)) {
            return reject('请上传 jpg/png 格式的图片');
        }
        var formData = new FormData();
        formData.append('file', file);

        return ajaxUpload(formData).then(res => {
            if (res.data.code != 0) return reject();
            if (!res.data.data) return reject();
            var data = res.data.data;
            var url = data.url;
            resolve(url);
        }).catch(err => {
            reject('上传失败');
        });
    })
}

export const scrollPercent = (head = '.detail-contianer', foot = '#comment') => {

    var Timer = null;
    var startTime = Date.now();
    var percent = 0;

    var $min = document.querySelector(head);
    var $max = document.querySelector(foot);

    if (!$max) {
        $max = document.querySelector('footer');
    }

    function _scroll(e) {
        if (percent >= 0.99) { percent = 1; return; }
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var min = $min.offsetTop, max = $max.offsetTop, winH = window.innerHeight;
        var all = max - winH - min;
        if (all < 0) { percent = 1; return; }
        percent = (scrollTop - min) / all;
        percent = Math.max(0, Math.min(1, percent));
    }

    return {
        init: function() {
            window.addEventListener('scroll', _scroll);
        },
        destroy: function(callback) {
            window.removeEventListener('scroll', _scroll);
            callback && callback({
                duration: Date.now() - startTime,
                completeness: percent * 100,
            });
        },
    }
}

export default {
    addZero,
    publishTime,
    decodeText,
    deepObject,
    decodeForXSS,
    getArticleType,
    addSrcPrefix,
    replaceImageInHtml,
    scrollPercent,
    uploadImage,
}