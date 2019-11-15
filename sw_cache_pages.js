/**
|--------------------------------------------------
| Catching Assets
|--------------------------------------------------
*/
const cacheName = 'version1';
const catchAssets = [ 'index.html', 'about.html', '/css/style.css', '/js/main.js' ];

/**
|--------------------------------------------------
| Call Install Event
|--------------------------------------------------
*/
// e.waitUntil(
// 	caches
// 		.open(cacheName)
// 		.then(catche => {
// 			console.log('Service Worker: Catching Files');
// 			catche.addAll(catchAssets);
// 		})
// 		.then(e => self.skipWaiting())
// 		.catch()
// );

self.addEventListener('install', e => {
	console.log('Service Worker: Installed');

	/**
    |--------------------------------------------------
    | Catching Files Install to Storage
    |--------------------------------------------------
    */
});

/**
|--------------------------------------------------
| Call Activate Event
|--------------------------------------------------
*/
self.addEventListener('activate', e => {
	console.log('Service Worker: Activated');

	/**
    |--------------------------------------------------
    | Remove UnWanted Caches
    |--------------------------------------------------
    */
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cacheName !== cache) {
						console.log('Service Workder Clearing Old Caches');
						caches.delete(cache);
					}
				})
			);
		})
	);
});

/**
|--------------------------------------------------
| Call Fetch Event
|--------------------------------------------------
*/
self.addEventListener('fetch', e => {
	console.log('Service Workder: Fetching');

	/**
    |--------------------------------------------------
    | Respond With Cache
    |--------------------------------------------------
    | fetch(e.request).catch(() => caches.match(e.request))
    */

	e.respondWith(
		fetch(e.request)
			// Fetching Request Array
			.then(res => {
				// Make Copy/Clone of Response
				const resClone = res.clone();

				caches.open(cacheName).then(cache => {
					cache.put(e.request, resClone);
				});
				return res;
			})
			// If Error
			.catch(err => caches.match(e.request).then(res => res))
	);
});
