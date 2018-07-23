var VERSION = 'v1.0.4';
// 1.0 初版
// 1.0.1 添加空格键触发
// 1.0.2 调整随机比例与最大值

// 缓存
self.addEventListener('install', function(event) {
	console.log('install', event)
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        './index.html',
        './libs/jquery.min.js',
        './img/back.png',
        './img/bg.png',
        './img/bg2.jpg',
        './img/btn.png',
        './img/copyright.png',
        './img/end.png',
        './img/good.png',
        './img/light.png',
        './img/logo.png',
        './img/man1.png',
        './img/man2.png',
        './img/man3.png',
        './img/man4.png',
        './img/man5.png',
        './img/number.png',
        './img/slogan.png',
        './img/slogan2.png',
        './img/stage.png',
        './img/your-name.png',
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', function(event) {
	console.log('activate', event)
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
// self.addEventListener('fetch', function(event) {
// 	console.log('fetch', event)
//   event.respondWith(caches.match(event.request).catch(function() {
//     return fetch(event.request);
//   }).then(function(response) {
//     caches.open(VERSION).then(function(cache) {
//       cache.put(event.request, response);
//     });
//     return response.clone();
//   }).catch(function() {
//     return caches.match('./img/bg.png');
//   }));
// });
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
    .then(function(response) {
      console.log(event.request)
      console.log(caches)
      // 如果发现匹配的响应，则返回缓存的值
      if (response) return response;
      return fetch(event.request);
    })
  );
});