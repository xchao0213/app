const RADIUS = 6371;

const toRad = function(n) {
  return n * Math.PI / 180;
};

const getDistance = function(from, to) {
  const fromLat = from[0];
  const fromLon = from[1];
  const toLat = to[0];
  const toLon = to[1];

  const dLat = toRad(toLat - fromLat);
  const dLon = toRad(toLon - fromLon);
  const fromLatRad = toRad(fromLat);
  const toLatRad = toRad(toLat);

  const a = Math.pow(Math.sin(dLat / 2), 2) +
          (Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLatRad) * Math.cos(toLatRad));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return RADIUS * c;
};

const measurePath = function(points) {
  return points.reduce(function(memo, point) {
    const distance = memo.lastPoint === null ? 0 : getDistance(memo.lastPoint, point);
    return { lastPoint: point, distance: distance + memo.distance };
  }, { lastPoint: null, distance: 0 }).distance;
};

export default function(fromLat, fromLon, toLat, toLon) {
  // if(typeof fromLat === 'number'){
  //   return getDistance([fromLat, fromLon], [toLat, toLon]);
  // } else {
  //   return measurePath(fromLat);
  // }
  console.log('getDistance')
  const nfromLat = parseFloat(fromLat);
  const nfromLon = parseFloat(fromLon);
  const ntoLat = parseFloat(toLat);
  const ntoLon = parseFloat(toLon);
  return getDistance([nfromLat, nfromLon], [ntoLat, ntoLon]);
};