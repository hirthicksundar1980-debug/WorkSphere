import { calculateHaversineDistance } from "@/lib/utils";

/**
 * Calculates the Haversine distance between two coordinates in kilometers.
 *
 * @param lat1 Latitude of point 1
 * @param lon1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lon2 Longitude of point 2
 * @returns Distance in kilometers
 */
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  return calculateHaversineDistance(lat1, lon1, lat2, lon2);
}

/**
 * Calculates the Haversine distance in miles.
 */
export function haversineMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  return haversineKm(lat1, lon1, lat2, lon2) * 0.621371;
}

/**
 * Calculates estimated walking time based on a standard 4.8 km/h pace.
 * @param distanceKm Distance in kilometers
 * @returns Walking time in minutes
 */
export function getWalkingMinutes(distanceKm: number): number {
  // Walking speed: 4.8 km/h = 0.08 km/min
  return Math.max(1, Math.round(distanceKm / 0.08));
}

/**
 * Formats a walking time badge string.
 * @param distanceKm Distance in kilometers
 * @returns Formatted badge string (e.g. "8 min walk · 650m")
 */
export function formatWalkingTimeBadge(distanceKm: number): string {
  const minutes = getWalkingMinutes(distanceKm);
  const distanceStr = distanceKm < 1 
    ? `${Math.round(distanceKm * 1000)}m` 
    : `${distanceKm.toFixed(1)}km`;
  return `${minutes} min walk · ${distanceStr}`;
}
