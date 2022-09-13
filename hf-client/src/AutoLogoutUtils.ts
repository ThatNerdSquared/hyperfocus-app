// import {isMobile} from 'react-device-detect';

// Setup the `beforeunload` event listener
export function setupBeforeUnloadListener(logMeOut: any) {
	// if(isMobile) {
		let hidden, visibilityChange;
		if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
			hidden = "hidden";
			visibilityChange = "visibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
		}
		window.addEventListener(visibilityChange, logMeOut)
	// }
	window.addEventListener('beforeunload', alertUser)
	window.addEventListener('unload', logMeOut)
	return () => {
		handleTabClosing(logMeOut)
	}
}

export function handleTabClosing(logMeOut: any) {
	window.removeEventListener('beforeunload', alertUser)
	window.removeEventListener('unload', logMeOut)
}

export function alertUser(event:any) {
	event.preventDefault()
	event.returnValue = ""
}
