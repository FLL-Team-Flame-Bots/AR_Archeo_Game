const EARTH_RADIUS_M = 6371000;

/**
 * Returns a random lat/lng offset from a center point.
 * @param centerLat  - player latitude
 * @param centerLng  - player longitude
 * @param minMeters  - minimum distance from player (default 30m so it's not right underfoot)
 * @param maxMeters  - maximum distance from player (default 150m — short walk away)
 */
export function randomNearbyPoint(
  centerLat: number,
  centerLng: number,
  minMeters = 3,
  maxMeters = 20
): { lat: number; lng: number } {
  const distance = minMeters + Math.random() * (maxMeters - minMeters);
  const bearing = Math.random() * 2 * Math.PI; // random compass direction

  const lat1 = toRad(centerLat);
  const lng1 = toRad(centerLng);
  const d = distance / EARTH_RADIUS_M;

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing)
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );

  return { lat: toDeg(lat2), lng: toDeg(lng2) };
}

/**
 * Assigns random locations to all fossils that have lat=0/lng=0,
 * spreading them around the player. Fossils that already have real
 * coordinates are left untouched.
 */
export function scatterFossils<T extends { lat: number; lng: number }>(
  fossils: T[],
  playerLat: number,
  playerLng: number
): T[] {
  return fossils.map((f) => {
    if (f.lat !== 0 || f.lng !== 0) return f; // already placed
    const { lat, lng } = randomNearbyPoint(playerLat, playerLng);
    return { ...f, lat, lng };
  });
}

/**
 * Generates `count` fossil instances from template definitions, each placed at
 * a random nearby position. Instances get unique IDs so the same type can
 * appear multiple times — enabling endless continuous generation.
 */
export function generateFossilInstances<T extends { id: string; lat: number; lng: number; discovered: boolean }>(
  templates: T[],
  count: number,
  playerLat: number,
  playerLng: number
): T[] {
  return Array.from({ length: count }, (_, i) => {
    const tpl = templates[i % templates.length];
    const { lat, lng } = randomNearbyPoint(playerLat, playerLng);
    return { ...tpl, id: `${tpl.id}_${Date.now()}_${i}`, lat, lng, discovered: false };
  });
}

function toRad(deg: number): number { return (deg * Math.PI) / 180; }
function toDeg(rad: number): number { return (rad * 180) / Math.PI; }
