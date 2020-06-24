/*
 * written by ForeverZ
 * at 2017.3.29  
 * contact me with E-Mail(617754841@qq.com) or 
 * contact me with GitHub(https://github.com/forever-z-133)
 *******************/

// ----------------- 兼容 ----------------------
!(function(){
    var _div = document.createElement('div');
    var support = {};
    function getVendorPropertyName(prop) {
        if (prop in _div.style) return prop;

        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        for (var i=0; i<prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in _div.style) { return vendorProp; }
        }
    }
    support.transition      = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform       = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
    support.animation       = getVendorPropertyName('animation');
    support.animationDelay  = getVendorPropertyName('animationDelay');
    support.fullScreen      = getVendorPropertyName('requestFullscreen');

    // 
    var transEndEventNames = {
        'transition':       'transitionend',
        'MozTransition':    'transitionend',
        'OTransition':      'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition':     'MSTransitionEnd',  
    };
    support.transitionEnd = transEndEventNames[support.transition] || null;

    var animEndEventNames = {
        animation:          'animationend',
        MozAnimation:       'animationend',
        OAnimation:         'oAnimationEnd oanimationend',
        WebkitAnimation:    'webkitAnimationEnd',
        msAnimation:        'MSAnimationEnd',
    };
    support.animationEnd = animEndEventNames[support.animation] || null;

    for (var key in support) {
        $ ? ($.support[key] = support[key]) : null;
    }

    // requestAnimationFrame
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    // 获取当前秒数时间
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    // 兼容 location.origin，获取完整 host
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    // 获取此元素现在已有的样式
    if (!HTMLElement.currentStyle) {
        function _getStyle(prop) {
            var _s = window.getComputedStyle(this, null)
            return prop ? _s[prop] : _s;
        }
        HTMLElement.prototype.currentStyle = _getStyle;
        HTMLElement.prototype.getStyle = _getStyle;
    }
})();

// ----------------- 判断的拓展 ----------------------
!(function(){
    // 判断类型
    function Type(obj) {
        var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
        return typeStr.substr(0, typeStr.length - 1).toLowerCase();
    }

    // 判断对象是否为空
    function isEmpty(obj) {
        for (var i in obj) return false;
        return true;
    }

    // 对比两个对象是否相等
    function ObjectEqual(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
     
        if (aProps.length != bProps.length) return false;

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    }
})();

// ----------------- 获取 ----------------------
!(function(){
    // 截取 search 中数值
    function GetQueryString(name, str, end) {
        var str = str || window.location.search;
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$' + (end ? ("|" + end) : "") + ')');
        var r = str.match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }

    // 区间内的随机数
    function Random(min, max) {
        return (min||0) + Math.random() * ((max||1) - (min||0));
    }

    // 自动补零
    function addZero(num, n) {
        var len = num.toString().length, n = n || 2;
        while (len < n) {
            num = '0' + num; len++;
        }
        return num + '';
    }

    // 生成唯一标识
    function guid(len) {
        return Math.random().toString(36).substring(2, (len||5)+2);
    }

    // 处理 json 字符串
    function JsonParse(response) {
        try {
            return JSON.parse(response);
        } catch(e) {
            return response;
        }
    }

    // 日期加减
    function DateAddDay(date, days) {
        var d = new Date(date);
        return new Date(d.setDate(d.getDate() + days));
    }
    // 这周的第一天
    function FirstDay(date, range) {
        var d = new Date(date);
        switch (range) {
            case 'year':
                return new Date(d.getFullYear(), 1, 1);
            case 'month':
                return new Date(d.setDate(1));
            case 'day':
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                return d;
            case 'week': 
            default:
                return DateAddDay(d, 1 - d.getDay());
        }
    }
    // 将日期转为字符串
    function ConvertDate(date, pattern) {
        var str = pattern;
        str = str.replace(/y{4}/i, date.getFullYear());
        str = str.replace(/m{2}/i, (date.getMonth()+1));
        str = str.replace(/d{2}/i, date.getDate());
        str = str.replace(/h{2}/i, date.getHours());
        str = str.replace(/n{2}/i, date.getMinutes());
        str = str.replace(/s{2}/i, date.getSeconds());
        return str;
    }
})();

// ----------------- jquery 拓展 ----------------------
!(function(){
    // 判断某 jquery 元素是否存在
    $.fn.exist = function(){
        return this.length > 0;
    }

    // 按钮禁用与激活
    $.fn.disable = function () {
        return this.each(function () {
            $(this).addClass('disabled').attr('tabindex', -1);
        });
    }
    $.fn.enable = function () {
        return this.each(function () {
            $(this).removeClass('disabled').removeAttr('tabindex');
        });
    }

    function AnimEnd(type, className, callback, stay) {
        if (Type(callback) === 'boolean') {stay = callback; callback = null;}
        return this.each(function() {
            var $this = $(this);
            $this.removeClass('hide').addClass(className);
            type ? $this.one($.support.transitionEnd, _end) : $this.one($.support.animationEnd, _end);
        });
        function _end() {
            var Timer = setTimeout(function(){
                clearTimeout(Timer);
                if (!stay) $this.removeClass(className);
                if (callback) callback.apply($this);
            }, 300);
        }
    }
    $.fn.addAnim = function(className, callback, stay) {
        AnimEnd.call(this, 0, className, callback, stay)
    }
    $.fn.addTrans = function(className, callback, stay) {
        AnimEnd.call(this, 1, className, callback, stay)
    }
})();

// ----------------- jquery 拓展2 ----------------------
!(function(){
    // 按键拓展
    $('body').on('click.default', '[href="#"]', function(e){
        e.preventDefault(); return false;
    });
})();

// ----------------- 其他封装 ----------------------
// 常用方法
!(function(){
    // 图片预加载
    function preloadImage(imgArr, fn, callback) {
        var count = 0, 
            len = Type(imgArr) === 'number' ? imgArr : imgArr.length;
        for(var i=0; i<len; i++) {
            var img = new Image();
            img.src = imgArr[i];
            img.onload = function() {
                count++;
                if (fn) fn(count/len*100);
                if (count === len) {
                    if (callback) callback();
                }
            };
        }
    }
})()


// 前端路由  ---------
!(function(){
    function Router() {
        this.routes = {};
        $(window).on('load.search hashchange.search', this.resolve.bind(this))
    }
    Router.prototype.route = function(path, callback) {
        this.routes[path] = callback || function(){};
    }
    Router.prototype.resolve = function (e) {
        this.curHash = location.hash.slice(1) || '/';
        typeof this.routes[this.curHash] === 'function' && this.routes[this.curHash]();
    }
    window.router = new Router();
})();

// 数据存储  ---------
!(function(){
    function Storage(item, isSession) {
        var db = isSession ? sessionStorage : localStorage;

        function JsonParse(response) {
            try {
                return JSON.parse(response);
            } catch(e) {
                return response;
            }
        }

        return {
            get: function(name) {
                if (typeof name === 'boolean' && name) return db;
                var _item = name || item;
                return JsonParse(db.getItem(_item));
            },
            remove: function(name){
                if (typeof name === 'boolean' && name) {
                    db.clear(); return db;
                }
                var _item = name || item;
                db.removeItem(_item);
                return db;
            },
            set: function(name, val) {
                if (name != item) {
                    if (typeof val !== 'undefined')  {
                        db.setItem(name, JSON.strigify(val));
                        return db;
                    }
                }
                db.setItem(item, JSON.strigify(name));
                return db;
            },
            clear: function() {
                db.clear();
            },
        }
    }
})();

// 监听输入，并进行判断 @ 的方法
function ListenSrting(elem, whenBegin, whenEnd) {
  var $elem = document.querySelector(elem);
  var lastSelection = {};

  // 绑定事件
  $elem.addEventListener('click', _pressAt);
  $elem.addEventListener('keydown', _pressAt);
  function _pressAt(e) {
    var selection = getSelection();
    if (e.shiftKey && (e.keyCode === 50 || e.keyCode === 229)) {
      // 当输入 @ 时
      lastSelection = {
        range: selection.getRangeAt(0),
        offset: selection.focusOffset,
        selection: selection
      };
      whenBegin && whenBegin();
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      // 当按删除键时
      var range = selection.getRangeAt(0);
      var parent = range.startContainer.parentElement
      if (range.startOffset <= 1 && parent.className != "at-text") {
        var removeNode = range.startContainer.previousElementSibling;
      }
      if (parent.className == "at-text") {
        var removeNode = parent.parentElement;
      }
      removeNode && $elem.removeChild(removeNode);
    }
  }
  function _add(text) {
    $elem.focus();
    var selection = lastSelection.selection;
    var range = lastSelection.range;
    var textNode = range.startContainer;

    // 删除 @ 符号。
    range.setStart(textNode, range.endOffset);
    range.setEnd(textNode, range.endOffset + 1);
    range.deleteContents();

    // 生成需要显示的内容，包括一个 span 和一个空格。
    var spanNode1 = document.createElement('span');
    var spanNode2 = document.createElement('span');
    spanNode1.className = 'at-text';
    spanNode1.innerHTML = ' @' + text;
    spanNode2.innerHTML = '&nbsp;';

    // 将生成内容打包放在 Fragment 中，并获取生成内容的最后一个节点，也就是空格。
    var frag = document.createDocumentFragment(),
        node, lastNode;
    frag.appendChild(spanNode1);
    while ((node = spanNode2.firstChild)) {
        lastNode = frag.appendChild(node);
    }

    // 将 Fragment 中的内容放入 range 中，并将光标放在空格之后。
    range.insertNode(frag);
    selection.extend(lastNode, 1);
    selection.collapseToEnd();

    whenEnd && whenEnd();
  }
  return {
    add: _add,
  }
}