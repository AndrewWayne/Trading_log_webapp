// 定义缓存名称和需要缓存的文件列表
const CACHE_NAME = 'trading-log-cache-v1';
const urlsToCache = [
  './', // 缓存根目录，通常是 index.html 或主文件
  './trading_log.html', // 明确缓存主HTML文件
  'https://cdn.tailwindcss.com', // 缓存Tailwind CSS
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js' // 缓存marked.js
];

// 监听 'install' 事件，在安装时将文件添加到缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// 监听 'fetch' 事件，拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    // 检查缓存中是否有匹配的请求
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有，则直接从缓存返回
        if (response) {
          return response;
        }
        // 如果缓存中没有，则通过网络请求，并返回结果
        return fetch(event.request);
      })
  );
});
