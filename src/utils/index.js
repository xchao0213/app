export function isWeixin() {
  let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    }
    return false;
}

export function uniKey(arr, key) {
  const keys = arr.map(ele => ele[key]);
  const keySet = new Set(keys);
  return Array.from(keySet);
}