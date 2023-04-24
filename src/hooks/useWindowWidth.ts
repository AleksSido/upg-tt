import { useSyncExternalStore } from 'react';

// source: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
export default function useWindowWidth() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function subscribe(callback:(this: Window, ev: UIEvent) => any) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return window.innerWidth;
}
