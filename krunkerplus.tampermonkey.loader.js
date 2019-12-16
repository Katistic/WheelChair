// ==UserScript==
// @name         Krunker 1.9.2 Hack Loader
// @version      2.2.0
// @description  Rip from a Krunker Hack Client by THEGUY3ds
// @author       OVERHAX/THEGUY3ds + Hrt + ttap + Katistic
// @icon         https://www.google.com/s2/favicons?domain=krunker.io
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js
// @match        *://krunker.io/*
// @run-at       document-start
// @noframes
// @grant        none
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(event) {
	let r = new XMLHttpRequest();
	r.open('GET', 'https://raw.githubusercontent.com/Katistic/WheelChairGUI/master/hack.tampermonkey.js', false);
	r.send(null);

	if (r.status != 200) {
		console.error('Error GET hack: ' + r.status);
	}

	let s = document.createElement('script');
	s.innerHTML = r.responseText;
	document.body.appendChild(s);
});
