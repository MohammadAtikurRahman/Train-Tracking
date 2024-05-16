// controllers/locationController.js
const axios = require("axios");
const { fetchRailwayStations } = require("./dataController");

// Function to fetch detailed location information using Nominatim API
const fetchLocationDetails = async (lat, lon) => {
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

  try {
    const response = await axios.get(nominatimUrl);
    return response.data.address;
  } catch (error) {
    console.error("Error fetching location details from Nominatim API:", error);
    return null;
  }
};

const getNearestStation = async (req, res) => {
  const lat = 21.98892310807274;
  const lon = 89.95861545449362;
  console.log(`Received lat: ${lat}, lon: ${lon}`); // Debug log

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "Valid latitude and longitude are required" });
  }

  const stations = await fetchRailwayStations();
  console.log(`Fetched ${stations.length} stations`); // Debug log

  const findNearestStation = (lat, lon) => {
    let nearestStation = null;
    let shortestDistance = Infinity;

    stations.forEach((station) => {
      const distance = Math.sqrt(
        Math.pow(lat - station[0], 2) + Math.pow(lon - station[1], 2)
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestStation = station;
      }
    });

    return nearestStation;
  };

  const nearestStation = findNearestStation(lat, lon);
  if (nearestStation) {
    console.log(`Nearest station: ${nearestStation[2]}, Lat: ${nearestStation[0]}, Lon: ${nearestStation[1]}`); // Debug log
    const locationDetails = await fetchLocationDetails(lat, lon);
    res.json({
      name: nearestStation[2],
      lat: nearestStation[0],
      lon: nearestStation[1],
      location: locationDetails,
    });
  } else {
    res.status(404).json({ error: "No station found" });
  }
};

module.exports = {
  getNearestStation,
};
