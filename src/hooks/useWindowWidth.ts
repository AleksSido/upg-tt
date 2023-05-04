import { useSyncExternalStore } from 'react';
import debounce from 'lodash.debounce';

// source: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
function getSnapshot() {
	return window.innerWidth;
}

function subscribe(callback: (this: Window, ev: UIEvent) => any) {
	const debouncedCallback = debounce(callback, 500);
	window.addEventListener('resize', debouncedCallback);
	return () => window.removeEventListener('resize', debouncedCallback);
}

export default function useWindowWidth() {
	return useSyncExternalStore(subscribe, getSnapshot);
}
