document.addEventListener("DOMContentLoaded", event => {
	//wrap the registration in an if statement to avoid errors in browsers that don't support a service worker
	if (navigator.serviceWorker) {
		//register for a service worker, giving the location of the service worker script. It returns a promise so you get callbacks for success and failure
		navigator.serviceWorker.register('sw.js').then(function() {
			console.log('Registration successful');
		}).catch(function() {
			console.log('Registration failed');
		});
	}
});


