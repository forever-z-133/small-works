
function Upload(isModal) {
  var _html = '';
  _html += '<form class="index-upload-box">';
  _html += '<div class="upload-head">有什么新的素材想告诉大家？</div>';
  _html += '<div class="upload-content">';
  _html += '<div class="message" contenteditable></div>';
  _html += '<span class="message-limit">已输入 <span class="upload-number-limit">0</span>/150 字</span>';
  _html += '</div>';
  _html += '<div class="upload-tools">';
  _html += '<div class="upload-upload">';
  _html += '<a href="#" class="btn btn-upload"><span>上传素材</span><span class="has-upload"></span></a>';
  if (isModal !== false) {
    _html += '<div class="upload-box">';
    _html += '<div class="head">';
    _html += '<span>本地上传</span>';
    _html += '<small>已上传<span id="upload-limit">0</span>个，还能上传<span id="upload-rest">9</span>个</small>';
    _html += '<a href="#" class="btn btn-close-upload"></a>';
    _html += '</div>';
    _html += '<ul class="list upload-list"><li class="item add">';
    _html += '<div class="imgRadio rect">';
    _html += '<div class="img form-file"><input type="file" id="upload-input"></div>';
    _html += '</div></li></ul></div>';
  }
  _html += '</div>';
  _html += '<div class="upload-author">';
  _html += '<a href="#" class="btn btn-choose-author"></a>';
  if (isModal !== false) {
    _html += '<ul class="list choose-author-list"></ul>';
  }
  _html += '</div>';
  _html += '<div class="upload-category">';
  _html += '<a href="#" class="btn btn-choose-category"></a>';
  if (isModal !== false) {
    _html += '<ul class="list category-list"></ul>';
  }
  _html += '</div>';
  _html += '<button class="btn btn-update" type="submit">发布</button>';
  _html += '</div>';
  _html += '</form>';
  return _html;
}
// 上传了一个
function create_one_upload(data) {
  var _html = '';          
  _html += '<li class="item">';
  _html += '<div class="imgRadio rect">';
  _html += '<div class="img" style="background-image: url(' + data + ')"></div>';
  _html += '<button class="btn-remove-upload"></button>';
  _html += '</div></li>';
  return $(_html).prependTo($upload_list);
}
// 添加自动补全项
function update_search_list(data) {
  var _html = '';
  for (var i in data) {
    _html += '<li class="item">';
    _html += '<a href="#" class="link">';
    _html += '<span>' + 'x' + '</span>';
    _html += '</a></li>';
  }
  $search_list.empty().html(_html);
}
function Author(data) {
  var _html = '';
  for (var i in data) {
    _html += '<li class="item" data-id="">';
    _html += '<a href="#" class="link text">';
    _html += '<span>' + data[i] + '</span>';
    _html += '</a></li>'
  }
  return _html;
}
function Category(data) {
  var _html = '';
  for (var i in data) {
    _html += '<li class="item"><a href="#" class="link"><span>' + data[i] + '</span></a></li>';
  }
  return _html;
}
function OneSource(data) {
  var _html = '';
  _html += '<li class="item file">';
  _html += '<a href="#" class="">';
  _html += '<img src="img/body-bg.jpg">';
  _html += '</a>';
  _html += '</li>';
  return _html;
}
function OneCard(data) {
  var _html = '';
  _html += '<li class="item one">';
  _html += '<div class="detail">';
  _html += '<div class="face">';
  _html += '<a href="#">';
  _html += '<img src="img/logo.png">';
  _html += '</a></div>';
  _html += '<div class="content">';
  _html += '<div class="name">你的名字</div>';
  _html += '<div class="identity">设计师</div>';
  _html += '<div class="time">0000.00.00</div>';
  _html += '<div class="type">设计</div>';
  _html += '<div class="word">' + '' + '</div>';
  _html += '<ul class="list c2 source">' + OneSource() + '</ul>';
  _html += '</div></div>';
  _html += '<div class="tools">';
  _html += '<a href="#" class="btn btn-collect"><span>收藏</span></a>';
  _html += '<a href="#" class="btn btn-like"><span>喜欢</span></a>';
  _html += '<a href="#" class="btn btn-share" data-clipboard-text="xxx"><span>分享</span></a>';
  _html += '<a href="#" class="btn btn-commit"><span>评论</span></a>';
  _html += '<a href="#" class="btn btn-download"><span>下载</span></a>';
  _html += '<a href="#" class="btn btn-more"><span>更多</span></a>';
  _html += '<ul class="list more-list">';
  _html += '<li class="item"><a href="#" class="btn"><span>添加标签</span></a></li>';
  _html += '<li class="item"><a href="#" class="btn"><span>帮他修改</span></a></li>';
  _html += '<li class="item"><a href="#" class="btn"><span>添加迭代</span></a></li>';
  _html += '</ul></div>';
  _html += '<div class="commit">';
  _html += '<header class="commit-head">';
  _html += '<div class="face">';
  _html += '<a href="#"><img src="img/logo.png"></a>';
  _html += '</div>';
  _html += '<form onsubmit="return false">';
  _html += '<input type="text" class="reply-word">';
  _html += '<button type="submit">评论</button>';
  _html += '</form></header></div>';
  _html += '</li>';
  return _html;
}
function OneCommit(data) {
  var _html = '';
  _html += '<li class="item">';
  _html += '<div class="detail">';
  _html += '<div class="face">';
  _html += '<a href="#">';
  _html += '<img src="' + ('' || 'img/logo.png') + '">';
  _html += '</a></div>';
  _html += '<div class="content">';
  _html += '<a href="#" class="name">' + '' + '</a>: ';
  _html += '<span class="word">' + '' + '</span>';
  _html += '<div class="time">' + ('' || newDate('yy-mm-dd')) + '</div>';
  _html += '<div class="tools">';
  _html += '<a href="#" class="btn btn-reply">回复</a>';
  _html += '<a href="#" class="btn btn-good">赞 ' + '' + '</a>';
  _html += '</div>';
  _html += '<form onsubmit="return false">';
  _html += '<span class="reply-who">回复@xxx:</span>';
  _html += '<input type="text" class="reply-word">';
  _html += '<button type="submit">评论</button>';
  _html += '</form>';
  _html += '</div></div></li>';
  return _html;
}
function OneReply(data) {
  var _html = '';
  _html += '<li class="item">';
  _html += '<a href="#" class="name">' + '' + '</a>';
  _html += '<span>回复</span>';
  _html += '<a href="#" class="name">@' + '' + '</a>: ';
  _html += '<span class="word">' + '' + '</span>';
  _html += '<div class="time">' + '' + '</div>';
  _html += '<div class="tools">';
  _html += '<a href="#" class="btn btn-reply">回复</a>';
  _html += '<a href="#" class="btn btn-good">赞 ' + '' + '</a>';
  _html += '</div>';
  _html += '<form onsubmit="return false">';
  _html += '<span class="reply-who">回复@xxx:</span>';
  _html += '<input type="text" class="reply-word">';
  _html += '<button type="submit">评论</button>';
  _html += '</form>';
  _html += '</li>';
  return _html;
}