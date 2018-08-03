/*I wanted to create a link/button to skip the external links from the map. I used setInterval because nothing else seemed to work reliably*/
setInterval(function(){
	if (document.querySelectorAll('.leaflet-control-attribution').length) {
		if (!document.querySelectorAll('.skip-links').length) {

			var externalLinks = document.querySelector('.leaflet-control-attribution');

			var a = document.createElement('a');
			var linkText = document.createTextNode('Skip external links');
			a.appendChild(linkText);
			a.href = '#skip-map';
			a.classList.add('skip-links');

			externalLinks.insertBefore(a, externalLinks.firstChild);
			console.log('Link created');
		}
	}
}, 3000);