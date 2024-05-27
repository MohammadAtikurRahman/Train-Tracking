
const axios = require("axios");
const geolib = require("geolib");

const overpassApiUrl = "http://overpass-api.de/api/interpreter";

const fetchRailwayStationsQuery = `
[out:json];
area["ISO3166-1"="BD"][admin_level=2];
node["railway"="station"](area);
out body;
`;

const fetchCitiesQuery = `
[out:json];
area["ISO3166-1"="BD"][admin_level=2];
node["place"="city"](area);
out body;
`;

const fetchThanasQuery = `
[out:json];
area["ISO3166-1"="BD"][admin_level=2];
node["place"="town"](area);
out body;
`;

const fetchVillagesQuery = `
[out:json];
area["ISO3166-1"="BD"][admin_level=2];
node["place"="village"](area);
out body;
`;

// Function to fetch data from Overpass API
const fetchDataFromOverpass = async (query) => {
  try {
    const response = await axios.post(overpassApiUrl, `data=${encodeURIComponent(query)}`);
    return response.data.elements;
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return [];
  }
};

const fetchRailwayStations = async () => {
  return await fetchDataFromOverpass(fetchRailwayStationsQuery);
};

const fetchCities = async () => {
  return await fetchDataFromOverpass(fetchCitiesQuery);
};

const fetchThanas = async () => {
  return await fetchDataFromOverpass(fetchThanasQuery);
};

const fetchVillages = async () => {
  return await fetchDataFromOverpass(fetchVillagesQuery);
};

// Function to determine the direction of latitude and longitude
const getDirection = (lat, lon) => {
  const latDirection = lat >= 0 ? "North" : "South";
  const lonDirection = lon >= 0 ? "East" : "West";
  return `${latDirection}, ${lonDirection}`;
};

const getNearestLocation = async (lat, lon) => {
  const stations = await fetchRailwayStations();
  const cities = await fetchCities();
  const thanas = await fetchThanas();
  const villages = await fetchVillages();

  const nearestStation = geolib.findNearest(
    { latitude: lat, longitude: lon },
    stations.map((station) => ({ latitude: station.lat, longitude: station.lon, name: station.tags.name }))
  );

  const nearestCity = geolib.findNearest(
    { latitude: lat, longitude: lon },
    cities.map((city) => ({ latitude: city.lat, longitude: city.lon, name: city.tags.name }))
  );

  const nearestThana = geolib.findNearest(
    { latitude: lat, longitude: lon },
    thanas.map((thana) => ({ latitude: thana.lat, longitude: thana.lon, name: thana.tags.name }))
  );

  const nearestVillage = geolib.findNearest(
    { latitude: lat, longitude: lon },
    villages.map((village) => ({ latitude: village.lat, longitude: village.lon, name: village.tags.name }))
  );

  return {
    Lat: lat,
    Lon: lon,
    Direction: getDirection(lat, lon),
    Station: nearestStation ? nearestStation.name : null,
    District: nearestCity ? nearestCity.name : null,
    Thana: nearestThana ? nearestThana.name : null,
    Village: nearestVillage ? nearestVillage.name : null
  };
};

// Manually set latitude and longitude
const lat = 24.396119;
const lon = 89.7334733;

const getNearestLocationHandler = async (req, res) => {
  const nearestLocation = await getNearestLocation(lat, lon);
  res.json(nearestLocation);
};

module.exports = {
  getNearestLocationHandler,
  fetchRailwayStations,
  fetchCities,
  fetchThanas,
  fetchVillages,
};
