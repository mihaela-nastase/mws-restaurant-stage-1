//I'm going to maintain a safe list of cache names I want to keep and remove the others. To do that I'm going to store the name of the static cache in a variable.
var staticCacheName = 'restaurant-static-v1';

//The install event is fired when the browser runs a service worker for the first time, and only after its completion does the service worker take control of the pages. This is an opportunity to create a cache, using the Cache API.
self.addEventListener('install', function(event) {

	//event.waitUntil lets us signal the progress of the install event. We pass it a Promise. If and when the promise resolves, the browser knows the install is complete. If the promise rejects, it knows the install failed, and this service worker should be discarded.
	event.waitUntil(

		//caches.open is used to create or open a cache. It returns a promise for a cache of that name
		caches.open(staticCacheName).then(function(cache) {

			//This takes an array of requests or URLs, fetches them, and puts the request-response pairs into the cache. If any of these fail to cache, none of them are added
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/css/responsive.css',
				'/css/responsive-restaurant.css',
				'/css/accessible.css',
				'/js/dbhelper.js',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/data/restaurants.json',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg'
			]);
		})
	);
});


//the activate event fires when this service worker becomes active, when it's ready to control pages and the previous service worker is gone. This makes it the perfect time to get rid of old caches
self.addEventListener('activate', function(event) {

	//event.waitUntil signals the length of the process
	event.waitUntil(

		//caches can be deleted using caches.delete and passing in the name of the cache, or using caches.keys
		caches.keys().then(function(cacheNames) {

			//I'm wrapping all of it in a Promise.all so we wait on the completion of all of these promises.
			return Promise.all(
				cacheNames.filter(function(cacheName) {

					//we get all of the cache names, but we are only interested in those that start with restaurant-, but don't have the name of a static cache. That gives us a list of restaurant caches that we don't need anymore. This way we also avoid deleting caches from other apps that might be running on the same origin, if the origin is shared by multiple service workers.
					return cacheName.startsWith('restaurant') && cacheName != staticCacheName;

				//I map the list of restaurant caches that I don't need anymore to promises returned by caches.delete
				}).map(function(cacheName) {
					//delete the caches
					return cache.delete(cacheName);
				})
			);
		})
	);
});


//requests trigger a fetch event. We respond to the request with an entry from the cache if there is one. Otherwise, we fetch it from the network.
self.addEventListener('fetch', function(event) {

	var requestUrl = new URL(event.request.url);
	
	//pause the requestUrl to check if the request origin is the same as the current origin, as we only want to intercept route requests for the same origin.
	if (requestUrl.origin === location.origin) {
		//check the pathname. If it's the route, respond with the page straight from the cache. We don't need to go to the network as a fallback, because the page is cached as part of the install step
		if (requestUrl.pathname === '/') {
			event.respondWith(caches.match('/'));
			return;
		}
	}

	//we call event.respondWith synchronously, we can't call it within a promise handler because it would be too late.
	event.respondWith(

		//caches.match tries to find a match in the cache, starting with the oldest files. We pass in a request or a URL. This will return a promise for a matching response if one is found, or null otherwise.
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});



self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});