// controllers/dataController.js
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

const getStationsWithDetails = async () => {
  const stations = await fetchRailwayStations();
  const cities = await fetchCities();
  const thanas = await fetchThanas();
  const villages = await fetchVillages();

  return stations.map((station) => {
    const nearestCity = geolib.findNearest(
      { latitude: station.lat, longitude: station.lon },
      cities.map((city) => ({ latitude: city.lat, longitude: city.lon, name: city.tags.name }))
    );

    const nearestThana = geolib.findNearest(
      { latitude: station.lat, longitude: station.lon },
      thanas.map((thana) => ({ latitude: thana.lat, longitude: thana.lon, name: thana.tags.name }))
    );

    const nearestVillage = geolib.findNearest(
      { latitude: station.lat, longitude: station.lon },
      villages.map((village) => ({ latitude: village.lat, longitude: village.lon, name: village.tags.name }))
    );

    return {
      Lat: station.lat,
      Lon: station.lon,
      Station: station.tags.name,
      District: nearestCity ? nearestCity.name : null,
      Thana: nearestThana ? nearestThana.name : null,
      Village: nearestVillage ? nearestVillage.name : null
    };
  });
};

const getStations = async (req, res) => {
  const stations = await getStationsWithDetails();
  res.json(stations);
};

module.exports = {
  getStations,
  fetchRailwayStations,
  fetchCities,
  fetchThanas,
  fetchVillages,
};
