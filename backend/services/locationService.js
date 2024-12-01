const geolib = require("geolib");

/**
 * Calculate distance between two points.
 * @param {Object} pointA - First location with latitude and longitude.
 * @param {Object} pointB - Second location with latitude and longitude.
 * @returns {number} - Distance in meters.
 */
exports.calculateDistance = (pointA, pointB) => {
  return geolib.getDistance(pointA, pointB);
};

/**
 * Find nearby locations within a specified radius.
 * @param {Array} locations - List of locations with latitude and longitude.
 * @param {Object} center - Center point with latitude and longitude.
 * @param {number} radius - Radius in meters.
 * @returns {Array} - List of locations within the radius.
 */
exports.findNearbyLocations = (locations, center, radius) => {
  return locations.filter((location) => {
    const distance = geolib.getDistance(center, {
      latitude: location.latitude,
      longitude: location.longitude,
    });
    return distance <= radius;
  });
};

/**
 * Validate if a location object contains valid latitude and longitude.
 * @param {Object} location - Object with latitude and longitude.
 * @returns {boolean} - True if valid, false otherwise.
 */
exports.isValidLocation = (location) => {
  const { latitude, longitude } = location;
  return (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    geolib.isValidCoordinate(location)
  );
};
