// Service Worker for 不瘪微鼓 PWA
const CACHE_NAME = 'bubie-weigu-v1';

// 需要缓存的资源列表
const urlsToCache = [
  '/',
  '/index.html',
  '/main.html',
  '/merchant.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/14fa20a648e64f58be0fc456439c4f98~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=20260305195423585EF72457F081911899&rrcfp=f06b921b&x-expires=1775303670&x-signature=8ah8iRtS15k6ULMi7WUzAJwHiOA%3D',
  'https://p26-doubao-search-sign.byteimg.com/isp-i18n-media/img/605190694d1c36e7c5f7ddbbc7cf7f0e~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1788264749&x-signature=wU%2BnGFEZj0RLBLIUGrzFJ6J7wLg%3D'
];

// 安装 Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  
  event.respondWith(
    // 尝试从缓存中获取资源
    caches.match(event.request)
      .then(cachedResponse => {
        // 如果缓存中有资源，则返回缓存的资源
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // 否则发起网络请求
        return fetch(event.request)
          .then(response => {
            // 确保响应有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，因为响应是流，只能使用一次
            const responseToCache = response.clone();
            
            // 将新获取的资源添加到缓存中
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.log('Service Worker: Fetch failed; returning offline page instead.', error);
            
            // 如果网络请求失败，可以返回一个离线页面
            return caches.match('/index.html');
          });
      })
  );
});

// 处理推送通知
self.addEventListener('push', event => {
  console.log('Service Worker: Push Received');
  
  if (event.data) {
    const data = event.data.json();
    console.log('Service Worker: Push data:', data);
    
    const options = {
      body: data.body || '您有新的比价信息',
      icon: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/14fa20a648e64f58be0fc456439c4f98~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=20260305195423585EF72457F081911899&rrcfp=f06b921b&x-expires=1775303670&x-signature=8ah8iRtS15k6ULMi7WUzAJwHiOA%3D',
      badge: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/14fa20a648e64f58be0fc456439c4f98~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=20260305195423585EF72457F081911899&rrcfp=f06b921b&x-expires=1775303670&x-signature=8ah8iRtS15k6ULMi7WUzAJwHiOA%3D',
      data: {
        url: data.url || '/main.html'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || '不瘪微鼓', options)
    );
  }
});

// 处理通知点击
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(windowClients => {
      // 如果已经有打开的窗口，则聚焦到该窗口
      for (let client of windowClients) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // 否则打开一个新窗口
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

// 处理后台同步
self.addEventListener('sync', event => {
  if (event.tag === 'price-check') {
    event.waitUntil(
      // 执行后台数据同步操作
      console.log('Service Worker: Background sync for price check')
    );
  }
});