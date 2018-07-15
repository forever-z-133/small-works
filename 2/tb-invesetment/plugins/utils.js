import { ajaxUpload } from "../plugins/ajax_zyh.js";

// 判断类型
function TypeOf(obj) {
    return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

// 去掉可能的 XSS 攻击代码
function decodeText(msg) {
    if (!msg) return '';
    let ele = document.createElement('span');
    ele.appendChild( document.createTextNode( msg ) );
    return ele.innerHTML;
}

// 递归获取 Object 的值
function deepObject(obj, fn) {
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
function decodeForXSS(obj) {
    if (typeof obj === 'string') return decodeText(obj);
    return deepObject(obj, val => {
        return typeof val === 'string' ? decodeText(val) : val;
    });
}

// 将 date 对象转为 pattern 格式
function parseTime(date, pattern = 'yyyy-mm-dd') {
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
function addZero(num, len = 2) {
    if ((num + "").length >= len) return num;
    return addZero("0" + num, len);
}

// 发布时间
// 不久，60秒前，60分钟前，24小时前，昨天，前天，0000-00-00
function publishTime(time, pattern) {
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

// 替换文本中的链接，比如加前缀什么的
function _replaceSrcInHtml(reg, fn) {
    return function(html, baseUrl) {
        return html.replace(reg, (img, src) => {
            let newSrc = fn(src, baseUrl);
            img = img.replace(src, newSrc);
            return img;
        });
    }
}
function addSrcPrefix(url, baseUrl) {
    if (typeof baseUrl === 'function') {
        return baseUrl(url)
    } else {
        baseUrl = baseUrl.replace(/\/$/, '') + '/';
        url = url.replace(/^\/*/, '');
        return url ? baseUrl + url : '';
    }
}
var replaceImageInHtml = _replaceSrcInHtml(/<img[^src]+src="([^"]*)"[^>]*>/g, addSrcPrefix);
var replaceVideoInHtml = _replaceSrcInHtml(/<video[^src]+src="([^"]*)"[^>]*>/g, addSrcPrefix);

// 文章类型
const articleType = {
    1: '新闻',
    2: '问答',
    3: '公司',
    4: '需求',
    5: '图说',
    99: '报告',
};
function getArticleType(index) {
    return articleType[index];
}

// 上传图片
function uploadImage(files) {
    return new Promise((resolve, reject) => {
        if (!files || files.length < 1) return;
        var file = files[0];
        if (!/\.jpe?g|png/.test(file.name)) {
            return this.$message.warning('请上传 jpg/png 格式的图片');
        }
        var formData = new FormData();
        formData.append('file', file);

        ajaxUpload(formData).then(res => {
            if (res.data.code != 0) return reject();
            if (!res.data.data) return reject();
            var data = res.data.data;
            var url = data.url;
            this.$message.success('上传成功');
            resolve(url);
        }).catch(err => {
            this.$message.warning('上传失败');
            reject();
        });
    })
}

function scrollPercent(min = 0, max = 0) {

    function _scroll(e) {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var windowHeight = window.innerHeight;
        var documentHeight = e.target.childNodes[1].offsetHeight;
        
    }

    return {
        init: function() {
            window.addEventListener('scroll', _scroll);
        },
        destroy: function() {
            window.removeEventListener('scroll', _scroll);
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