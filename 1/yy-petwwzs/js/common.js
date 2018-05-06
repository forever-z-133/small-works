
var $win = $(window), $body = $('.body');

$body.on('click', '.btn-menu', function() {
  $(this).toggleClass('btn-menu-on');
  $('.main-menu').toggleClass('opened');
});

if ($win.width() < 768) {
  $('.header').appendTo('.body > .header');
}

if ($('.index-gallery-list').length > 0) {
  var galleryData = [{
    name: '清洗消毒',
    title: '标题标题标题',
    address: '湖北武汉',
    pet: '小小',
    desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    video: '',
  }, {
    name: '独立悼念',
    title: '标题标题标题',
    address: '湖北武汉',
    pet: '小小',
    desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    video: '',
  }, {
    name: '单独火化',
    title: '标题标题标题',
    address: '湖北武汉',
    pet: '小小',
    desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    video: '',
  }, {
    name: '骨灰装罐',
    title: '标题标题标题',
    address: '湖北武汉',
    pet: '小小',
    desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    video: '',
  }, {
    name: '骨灰存放',
    title: '标题标题标题',
    address: '湖北武汉',
    pet: '小小',
    desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    video: '',
  }, {
    name: '宠物晶体产品',
    title: '标题标题标题',
    address: '湖北武汉',
    pet: '小小',
    desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    video: '',
  }];
  var slidesPerView = $win.width() > 768 ? 4 : 2;
  var $gallery = $('.swiper-outer');
  new Swiper('.index-gallery-list', {
    loop: true,
    autoplay: 4000,
    slidesPerView: slidesPerView,
    // onTransitionStart: function(swiper){
    //   // changeGallery(swiper.activeIndex);
    // }
  });
  function changeGallery(index) {
    var r = galleryData[index];
    var $video = $gallery.find('.video').prop('src', r.video);
    $video[0] && $video[0].play();
    $gallery.find('.gallery-title').text(r.title);
    $gallery.find('.gallery-address').text(r.address);
    $gallery.find('.gallery-pet-name').text(r.pet);
    $gallery.find('.gallery-desc').text(r.desc);
  }
}

$('.btn-toTop').on('click', function(e){
  e.preventDefault();
  $('.main').animate({scrollTop: 0});
});

$('.btn-contact').on('click', function(){
  $('#share').addClass('in');
});
$('.modal').on('click', '.cancel', function(){
  $(this).closest('.modal').removeClass('in');
})
if (window.innerWidth < 768) {
  var $qrcode = $('.qrcode-share');
  var qrcode = ['img/share/wechat3.png','img/share/weibo3.png','img/share/taobao3.png']
  $('.other-share a').on('click', function(e){
    e.preventDefault();
    var i = $(this).index();
    $(this).removeClass('grey').siblings().addClass('grey');
    $qrcode.attr('src', qrcode[i]);
  });
} else {
  var $qrcode = $('.qrcode-share');
  var qrcode = ['img/share/wechat3.png','img/share/weibo3.png','img/share/taobao3.png']
  $('.other-share a').on('mouseenter', function(e){
    e.preventDefault();
    var i = $(this).index();
    $(this).removeClass('grey').siblings().addClass('grey');
    $qrcode.attr('src', qrcode[i]);
  });
}