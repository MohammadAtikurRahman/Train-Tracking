const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS

const port = 4100;

const overpassApiUrl = "http://overpass-api.de/api/interpreter";
const overpassQuery = `
[out:json];
area["ISO3166-1"="BD"][admin_level=2];
node["railway"="station"](area);
out body;
`;

// Function to fetch railway station data from Overpass API
const fetchRailwayStations = async () => {
  try {
    const response = await axios.post(
      overpassApiUrl,
      `data=${encodeURIComponent(overpassQuery)}`
    );
    return response.data.elements.map((element) => [
      element.lat,
      element.lon,
      element.tags.name,
    ]);
  } catch (error) {
    console.error("Error fetching railway stations from Overpass API:", error);
    return [];
  }
};

// Endpoint to get railway stations data
app.get("/data", async (req, res) => {
  const stations = await fetchRailwayStations();
  res.json(stations);
});

// Endpoint to get the nearest railway station name based on provided lat/lon
app.get("/location", async (req, res) => {


  const lat = 23.75921882093117;
  const lon =  90.3838950221573;
  console.log(`Received lat: ${lat}, lon: ${lon}`); // Debug log

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "Valid latitude and longitude are required" });
  }

  const stations = await fetchRailwayStations();
  console.log(`Fetched ${stations.length} stations`); // Debug log

  const findNearestStation = (lat, lon) => {
    let nearestStation = null;
    let shortestDistance = Infinity;

    stations.forEach(station => {
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
    res.json({ name: nearestStation[2], lat: nearestStation[0], lon: nearestStation[1] });
  } else {
    res.status(404).json({ error: "No station found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
