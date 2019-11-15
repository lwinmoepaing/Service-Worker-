/**
|--------------------------------------------------
| Service Worker Checked 
|--------------------------------------------------
*/

if ('serviceWorker' in navigator) {
	/**
    |--------------------------------------------------
    | Document Loaded
    |--------------------------------------------------
    */
	window.addEventListener('load', function() {
		navigator.serviceWorker
			// Register
			.register('../sw_cache_pages.js')
			// Done
			.then(function(reg) {
				console.log('Service Worker: Registered');
			})
			// Error
			.catch(function(err) {
				console.error('Service Worker:' + err);
			});
	});
}
