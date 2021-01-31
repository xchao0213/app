export function isWeixin() {
  let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    }
    return false;
}

export function uniKey(arr, key) {
  let keys = arr.map(ele => ele[key]);
  keys.unshift('全部');
  const keySet = new Set(keys);
  return Array.from(keySet);
}