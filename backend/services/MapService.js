const axios = require("axios");

// Example: Google Maps API Key
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Perform geocoding to get latitude and longitude from an address.
 * @param {string} address - The address to geocode.
 * @returns {Object} - { latitude, longitude } or null if failed.
 */
exports.geocodeAddress = async (address) => {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    }
    return null;
  } catch (error) {
    console.error("Error in geocoding address:", error);
    throw new Error("Failed to geocode address");
  }
};

/**
 * Perform reverse geocoding to get address from latitude and longitude.
 * @param {number} latitude - Latitude of the location.
 * @param {number} longitude - Longitude of the location.
 * @returns {string} - Address or null if failed.
 */
exports.reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        latlng: `${latitude},${longitude}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    throw new Error("Failed to reverse geocode location");
  }
};

/**
 * Generate a map link for displaying a location.
 * @param {number} latitude - Latitude of the location.
 * @param {number} longitude - Longitude of the location.
 * @returns {string} - URL to view the map.
 */
exports.getMapLink = (latitude, longitude) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};
