import { 
  haversineKm, 
  haversineMiles, 
  getWalkingMinutes, 
  formatWalkingTimeBadge 
} from "@/lib/distance";

describe("distance module", () => {
  const london = { lat: 51.5074, lng: -0.1278 };
  const paris = { lat: 48.8566, lng: 2.3522 };
  const manhattan = { lat: 40.7831, lng: -73.9712 };
  const brooklyn = { lat: 40.6782, lng: -73.9442 };

  describe("haversineKm", () => {
    it("should accurately calculate distance between London and Paris in km", () => {
      const distance = haversineKm(london.lat, london.lng, paris.lat, paris.lng);
      // Actual is ~343 km
      expect(distance).toBeGreaterThan(340);
      expect(distance).toBeLessThan(350);
    });

    it("should accurately calculate distance between Manhattan and Brooklyn in km", () => {
      const distance = haversineKm(manhattan.lat, manhattan.lng, brooklyn.lat, brooklyn.lng);
      // Actual is ~12 km
      expect(distance).toBeGreaterThan(11);
      expect(distance).toBeLessThan(13);
    });

    it("should return 0 for identical coordinates", () => {
      expect(haversineKm(london.lat, london.lng, london.lat, london.lng)).toBeCloseTo(0);
    });
  });

  describe("haversineMiles", () => {
    it("should accurately convert distance to miles", () => {
      const distanceKm = haversineKm(london.lat, london.lng, paris.lat, paris.lng);
      const distanceMiles = haversineMiles(london.lat, london.lng, paris.lat, paris.lng);
      expect(distanceMiles).toBeCloseTo(distanceKm * 0.621371, 3);
    });
  });

  describe("getWalkingMinutes", () => {
    it("should compute accurate walking minutes at 4.8 km/h", () => {
      expect(getWalkingMinutes(0.8)).toBe(10);  // 0.8 / 0.08 = 10
      expect(getWalkingMinutes(2.4)).toBe(30);  // 2.4 / 0.08 = 30
    });

    it("should cap at minimum of 1 minute", () => {
      expect(getWalkingMinutes(0.01)).toBe(1);
    });
  });

  describe("formatWalkingTimeBadge", () => {
    it("should format string correctly for distances < 1 km (in meters)", () => {
      expect(formatWalkingTimeBadge(0.65)).toBe("8 min walk · 650m");
      expect(formatWalkingTimeBadge(0.5)).toBe("6 min walk · 500m");
    });

    it("should format string correctly for distances >= 1 km (in km with 1 dec place)", () => {
      expect(formatWalkingTimeBadge(1.2)).toBe("15 min walk · 1.2km");
      expect(formatWalkingTimeBadge(2.0)).toBe("25 min walk · 2.0km");
    });
  });
});
